import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetMyProgramCodeParams, GetMyProgramCodeResults } from '../protocol/GetMyProgramCode'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'
import { Get } from '../shared/HttpRequest'

export function useMyCode(lectureName: string | undefined, problemId: string | undefined) {
  const [code, setCode] = useState('')
  const participantId = getId() ?? ID_NOT_FOUND

  useEffect(() => {
    if (lectureName && problemId) {
      Get<GetMyProgramCodeParams, GetMyProgramCodeResults>(`${SERVER_ADDRESS}/getMyProgramCode`, {
        category: lectureName,
        problemId,
        participantId,
      }).then(res => {
        if (res) {
          setCode(res.code)
        }
      })
    }
  }, [problemId, lectureName, participantId])

  return code
}
