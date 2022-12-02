import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { CheckBoxAvailability, SubgoalNode } from '../pages/Label'
import { PostSubgoalsParams, PostSubgoalsResults, Subgoal as SubgoalWithoutId } from '../protocol/PostSubgoals'
import { getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { saveSubgoals } from '../shared/Utils'

export function useLabelSubmit(lecture: string | undefined, fileName: string | undefined) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const submit = useCallback(
    (checkBoxAvailability: CheckBoxAvailability[], subgoals: SubgoalNode[]) => () => {
      if (new Set(subgoals.flatMap(subgoal => subgoal.group)).size < checkBoxAvailability.length) {
        window.alert(getString('label_alert_assign_all_lines'))
        return
      }
      if (subgoals.some(subgoal => subgoal.label.length === 0)) {
        window.alert(getString('label_alert_fill_all_boxes'))
        return
      }
      if (subgoals.some(subgoal => subgoal.group.length === 0)) {
        window.alert(getString('label_alert_remove_empty_subgoals'))
        return
      }

      if (fileName && lecture) {
        setIsSubmitting(true)

        saveSubgoals(subgoals, fileName)

        Post<PostSubgoalsParams, PostSubgoalsResults>(
          `${SERVER_ADDRESS}/postSubgoals`,
          {
            participantId: getId() ?? ID_NOT_FOUND,
            lectureName: lecture,
            fileName,
            subgoals: subgoals.map(
              subgoal =>
                ({
                  label: subgoal.label,
                  group: subgoal.group,
                } as SubgoalWithoutId)
            ),
          },
          () => {
            setIsSubmitting(false)
            navigate(nextStage())
          },
          error => {
            setIsSubmitting(false)
            window.alert(error.message)
          }
        )
      }
    },
    [fileName, lecture, navigate]
  )

  return { isSubmitting, submit }
}
