import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { VotingItem } from '../protocol/Common'
import { GetVotingListParams, GetVotingListResults } from '../protocol/GetVotingList'
import { Get } from '../shared/HttpRequest'
import { useExperiment } from './useExperiment'

export function useVotingList(lectureName: string | undefined, fileName: string | undefined) {
  const [votingList, setVotingList] = useState<VotingItem[]>([])
  const { id } = useExperiment()

  useEffect(() => {
    if (lectureName && fileName) {
      Get<GetVotingListParams, GetVotingListResults>(`${SERVER_ADDRESS}/getVotingList`, {
        lectureName,
        fileName,
        participantId: id,
      }).then(res => {
        if (res) {
          setVotingList(
            res.votingItems.map(item => {
              return {
                id: item.id,
                group: item.group,
                labels: item.labels,
                answers: item.answers,
              }
            })
          )
        }
      })
    }
  }, [fileName, id, lectureName])

  return { votingList }
}
