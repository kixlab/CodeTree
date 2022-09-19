import { useCallback, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { ChoiceState } from '../pages/Vote'
import { VotingItem } from '../protocol/GetVotingList'
import { PostVotingChoicesParams, PostVotingChoicesResults } from '../protocol/PostVotingChoices'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'

export function useVoteSubmit(lectureName: string, fileName: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = useCallback(
    async (votingList: VotingItem[], choiceList: ChoiceState[]) => {
      setIsSubmitting(true)
      await Post<PostVotingChoicesParams, PostVotingChoicesResults>(
        `${SERVER_ADDRESS}/postVotingChoices`,
        {
          lectureName,
          fileName,
          votingChoices: choiceList.map((choice, index) => {
            const labels = votingList[index]?.labels?.filter?.((_, i) => choice.choice.includes(i)) ?? []
            if (choice.choice.includes(-1)) {
              labels.push(choice.newOption ?? '')
            }
            return {
              id: choice.id,
              labels,
            }
          }),
          participantId: getId() ?? ID_NOT_FOUND,
        },
        () => {},
        error => {
          window.alert(error.message)
        }
      )
      setIsSubmitting(false)
    },
    [fileName, lectureName]
  )

  return { isSubmitting, submit }
}
