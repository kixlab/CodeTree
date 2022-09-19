import { useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { CheckBoxAvailability, SubgoalNode } from '../pages/Label'
import { PostSubgoalsParams, PostSubgoalsResults, Subgoal as SubgoalWithoutId } from '../protocol/PostSubgoals'
import { getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { saveSubgoals } from '../shared/Utils'

export function useLabelSubmit(lecture: string, fileName: string, history: RouteComponentProps['history']) {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
          history.push(nextStage())
        },
        error => {
          setIsSubmitting(false)
          window.alert(error.message)
        }
      )
    },
    [fileName, history, lecture]
  )

  return { isSubmitting, submit }
}
