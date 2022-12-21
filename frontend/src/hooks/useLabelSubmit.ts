import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { PostSubgoalsParams, PostSubgoalsResults } from '../protocol/PostSubgoals'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { saveSubgoals } from '../shared/Utils'
import { SubgoalNode } from '../types/subgoalNode'
import { useExperiment } from './useExperiment'

export function useLabelSubmit(lecture: string | undefined, fileName: string | undefined, noEmptyGroup = true) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { id, nextStage } = useExperiment()

  const submit = useCallback(
    (subgoals: SubgoalNode[]) => async () => {
      if (subgoals.some(subgoal => subgoal.label.length === 0)) {
        window.alert(getString('label_alert_fill_all_boxes'))
        return
      }
      const emptySubgoal = subgoals.find(subgoal => subgoal.group.length === 0)
      if (noEmptyGroup && emptySubgoal) {
        window.alert(`"${emptySubgoal.label}"와 관련된 코드도 선택해주세요.`)
        return
      }

      if (fileName && lecture) {
        setIsSubmitting(true)

        saveSubgoals(subgoals, fileName)

        const res = await Post<PostSubgoalsParams, PostSubgoalsResults>(`${SERVER_ADDRESS}/postSubgoals`, {
          participantId: id,
          lectureName: lecture,
          fileName,
          subgoals: subgoals.map(subgoal => ({
            label: subgoal.label,
            group: subgoal.group,
            parentId: subgoal.parentId,
          })),
        })
        setIsSubmitting(false)
        if (res) {
          navigate(await nextStage())
        }
      }
    },
    [fileName, id, lecture, navigate, nextStage, noEmptyGroup]
  )

  return { isSubmitting, submit }
}
