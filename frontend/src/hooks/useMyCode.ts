import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetMyProgramCodeParams, GetMyProgramCodeResults } from '../protocol/GetMyProgramCode'
import { Get } from '../shared/HttpRequest'

export function useMyCode(category: string, problemId: string, participantId: string) {
  const [code, setCode] = useState('')

  useEffect(() => {
    Get<GetMyProgramCodeParams, GetMyProgramCodeResults>(
      `${SERVER_ADDRESS}/getMyProgramCode`,
      {
        category,
        problemId,
        participantId,
      },
      result => {
        setCode(result.code)
      },
      error => window.alert(error.message)
    )
  }, [problemId, category, participantId])

  return code
}
