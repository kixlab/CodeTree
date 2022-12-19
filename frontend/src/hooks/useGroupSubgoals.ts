import produce from 'immer'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import findLastIndex from 'lodash/findLastIndex'
import { getString } from '../shared/Localization'
import { colorGenerator } from '../shared/Utils'
import { CheckBoxAvailability } from '../types/checkboxAvailability'
import { SubgoalNode } from '../types/subgoalNode'

export function useGroupSubgoals(numberOfLines: number, initialSubgoals: SubgoalNode[] = []) {
  const [subgoalNextId, setSubgoalNextId] = useState(0)
  const [subgoals, setSubgoals] = useState<SubgoalNode[]>([])
  const [selectedSubgoal, setSelectedSubgoal] = useState<number | null>(null)
  const [checkBoxAvailability, setCheckBoxAvailability] = useState<CheckBoxAvailability[]>(
    Array(numberOfLines).fill(CheckBoxAvailability.AVAILABLE)
  )

  const getColor = useRef(colorGenerator())

  const selectSubgoal = useCallback((id: number | null) => {
    setSelectedSubgoal(id)
  }, [])

  const addSubgoal = useCallback(
    (id: number | null = null, canAddSubgoal = true) => {
      setSubgoals(
        produce(subgoals, draft => {
          const parent = findSubgoal(draft, id)
          draft[draft.findIndex(d => d.id === id)]?.children?.push(subgoalNextId)
          const lastChildIndex =
            id !== null
              ? findLastIndex(subgoals, subgoal => {
                  let s: SubgoalNode | null = subgoal
                  while (s !== null) {
                    if (s.id === id) {
                      return true
                    }
                    s = findSubgoal(subgoals, s.parentId)
                  }
                  return false
                }) + 1
              : draft.length
          draft.splice(lastChildIndex, 0, {
            id: subgoalNextId,
            label: '',
            group: [],
            children: [],
            parentId: id,
            depth: (parent?.depth ?? -1) + 1,
            canAddSubgoal,
            color: getColor.current(),
          })
        })
      )
      setSelectedSubgoal(subgoalNextId)
      setSubgoalNextId(subgoalNextId + 1)
    },
    [subgoalNextId, subgoals]
  )

  const removeSubgoal = useCallback(
    (id: number) => {
      setSubgoals(
        produce(subgoals, draft => {
          function remove(id: number) {
            const nodeIndex = draft.findIndex(d => d.id === id)
            const children = draft[nodeIndex]?.children ?? []
            if (nodeIndex >= 0) {
              draft.splice(nodeIndex, 1)
            }
            children.forEach(remove)
          }
          remove(id)
        })
      )
      setSelectedSubgoal(null)
    },
    [subgoals]
  )

  const editSubgoal = useCallback(
    (id: number, label: string) => {
      setSubgoals(
        produce(subgoals, draft => {
          draft[draft.findIndex(d => d.id === id)].label = label
        })
      )
    },
    [subgoals]
  )

  const clickCheckBox = useCallback(
    (index: number, checked: boolean) => {
      if (selectedSubgoal == null) {
        window.alert(getString('label_alert_select_subgoal_first'))
        return
      }

      setSubgoals(
        produce(subgoals, draft => {
          function remove(id: number) {
            const subgoal = draft.find(subgoal => subgoal.id === id)
            if (subgoal) {
              subgoal.group = subgoal.group.filter(i => i !== index)
              subgoal.children.forEach(remove)
            }
          }

          const selected = draft.find(d => d.id === selectedSubgoal)
          if (selected) {
            if (checked) {
              const indexToAdd = selected.group.findIndex(i => index <= i)
              selected.group.splice(indexToAdd >= 0 ? indexToAdd : selected.group.length, 0, index)
            } else {
              remove(selectedSubgoal)
            }
          }
        })
      )

      setCheckBoxAvailability(
        produce(checkBoxAvailability, draft => {
          draft[index] = checked ? CheckBoxAvailability.CHECKED : CheckBoxAvailability.AVAILABLE
        })
      )
    },
    [checkBoxAvailability, selectedSubgoal, subgoals]
  )

  useEffect(() => {
    const selected = findSubgoal(subgoals, selectedSubgoal)
    const parent = findSubgoal(subgoals, selected?.parentId ?? null)
    setCheckBoxAvailability(availability =>
      availability.map((_, index) => {
        if (selected?.group.includes(index)) {
          return CheckBoxAvailability.CHECKED
        }
        // 부모의 group에 없는 경우
        const isOutsideParentGroup = !(parent?.group.includes(index) ?? true)
        // 부모의 자식들의 group에 있는 경우
        const isCheckedBySilblings = (
          parent?.children?.map(childId => findSubgoal(subgoals, childId)) ?? subgoals
        ).some(child => child?.group.includes(index))

        if (isOutsideParentGroup || isCheckedBySilblings) {
          return CheckBoxAvailability.UNAVAILABLE
        }
        return CheckBoxAvailability.AVAILABLE
      })
    )
  }, [selectedSubgoal, subgoals])

  useEffect(() => {
    setCheckBoxAvailability(Array(numberOfLines).fill(CheckBoxAvailability.AVAILABLE))
  }, [numberOfLines])

  useEffect(() => {
    if (initialSubgoals.length > 0) {
      setSubgoals(initialSubgoals)
    }
  }, [initialSubgoals])

  useEffectOnce(() => {
    if (initialSubgoals.length === 0 && subgoals.length === 0) {
      addSubgoal()
    }
  })

  return {
    subgoals,
    selectedSubgoal,
    checkBoxAvailability,
    addSubgoal,
    removeSubgoal,
    selectSubgoal,
    editSubgoal,
    clickCheckBox,
  }
}

function findSubgoal(subgoals: SubgoalNode[], id: number | null): SubgoalNode | null {
  return subgoals[subgoals.findIndex(subgoal => subgoal.id === id)] ?? null
}
