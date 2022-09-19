import { useEffectOnce } from 'react-use'
import { useState } from 'react'
import { GetVotingListParams, GetVotingListResults, VotingItem } from '../protocol/GetVotingList'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { Get } from '../shared/HttpRequest'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'

export function useVotingList(lectureName: string, fileName: string) {
  const [votingList, setVotingList] = useState<VotingItem[]>([])

  useEffectOnce(() => {
    Get<GetVotingListParams, GetVotingListResults>(
      `${SERVER_ADDRESS}/getVotingList`,
      {
        lectureName,
        fileName,
        participantId: getId() ?? ID_NOT_FOUND,
      },
      result => {
        setVotingList(
          result.votingItems.map(item => {
            return {
              id: item.id,
              group: item.group,
              labels: item.labels,
              answers: item.answers,
            }
          })
        )
      },
      error => window.alert(error.message)
    )
  })

  return { votingList }
}
