import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetMyProgramCodeParams, GetMyProgramCodeResults } from '../protocol/GetMyProgramCode'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'
import { Get } from '../shared/HttpRequest'

export function useMyCode(
  category: string | undefined,
  problemId: string | undefined,
  participantId = getId() ?? ID_NOT_FOUND
) {
  const [code, setCode] = useState('')

  useEffect(() => {
    if (category && problemId) {
      Get<GetMyProgramCodeParams, GetMyProgramCodeResults>(`${SERVER_ADDRESS}/getMyProgramCode`, {
        category,
        problemId,
        participantId,
      }).then(res => {
        if (res) {
          setCode(res.code)
        }
      })
    }
  }, [problemId, category, participantId])

  return code
}
