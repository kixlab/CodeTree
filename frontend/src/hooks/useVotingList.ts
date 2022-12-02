import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetVotingListParams, GetVotingListResults, VotingItem } from '../protocol/GetVotingList'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'
import { Get } from '../shared/HttpRequest'

export function useVotingList(lectureName: string | undefined, fileName: string | undefined) {
  const [votingList, setVotingList] = useState<VotingItem[]>([])

  useEffect(() => {
    if (lectureName && fileName) {
      Get<GetVotingListParams, GetVotingListResults>(`${SERVER_ADDRESS}/getVotingList`, {
        lectureName,
        fileName,
        participantId: getId() ?? ID_NOT_FOUND,
      }).then(result => {
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
      })
    }
  }, [fileName, lectureName])

  return { votingList }
}
