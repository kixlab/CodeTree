import React from 'react'
import styled from '@emotion/styled'
import SubgoalLabel from './SubgoalLabel'
import { SubgoalNode } from '../pages/Label'
import { getString } from '../shared/Localization'
import { Color } from '../shared/Common'

interface Props {
  subgoals: SubgoalNode[]
  selectedSubgoal: number | null
  canAddSubgoals?: boolean
  addSubgoal?: (id: number | null) => void
  removeSubgoal: ((id: number) => void) | null
  selectSubgoal: (id: number) => void
  editSubgoal: ((id: number, label: string) => void) | null
}

export function SubgoalContainer({
  addSubgoal,
  canAddSubgoals = true,
  selectedSubgoal,
  removeSubgoal,
  selectSubgoal,
  editSubgoal,
  subgoals,
}: Props) {
  return (
    <Container>
      {subgoals.map((subgoal, i) => {
        const distFromParentNode = subgoal.parentId != null ? i - subgoals.findIndex(s => s.id === subgoal.parentId) : 0

        return (
          <SubgoalLabel
            key={subgoal.id}
            subgoal={subgoal}
            addSubgoal={addSubgoal}
            selected={subgoal.id === selectedSubgoal}
            distFromParentNode={distFromParentNode}
            selectSubgoal={selectSubgoal}
            removeSubgoal={removeSubgoal}
            editSubgoal={editSubgoal ? (label: string) => editSubgoal?.(subgoal.id, label) : null}
          />
        )
      })}
      {canAddSubgoals && addSubgoal != null && (
        <AddButton type="button" onClick={() => addSubgoal?.(null)}>
          <PlaceholderInput>{getString('label_placeholder')}</PlaceholderInput>
          <PlaceholderAddSubgoal>{getString('label_add_subgoal')}</PlaceholderAddSubgoal>
        </AddButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 10px;
`

const AddButton = styled.button`
  padding: 10px;
  border: 2px solid ${Color.Gray15};
  background-color: ${Color.Gray00};
  cursor: pointer;
  margin-bottom: 40px;
  user-select: none;
  outline: none;
  width: 100%;
  height: 104px;
  position: relative;
  text-align: left;

  &::after {
    content: '${getString('subgoal_container')}';
    color: ${Color.Blue};
    font-size: 18px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`

const PlaceholderInput = styled.div`
  width: calc(100% - 35px);
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 3px;
  font-size: 16px;
  border-bottom: 1px solid ${Color.Gray20};
  color: ${Color.Gray30};
  height: 25px;
`

const PlaceholderAddSubgoal = styled.div`
  color: ${Color.Gray20};
  padding: 4px 12px;
`
