import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { CodeType, ID } from '../protocol/Common'
import { GetMyProgramCodeParams, GetMyProgramCodeResults } from '../protocol/GetMyProgramCode'
import { Get } from '../shared/HttpRequest'

export function useMyCode(category: string | undefined, problemId: string | undefined, participantId: ID) {
  const [code, setCode] = useState('')
  const [codeType, setCodeType] = useState<CodeType>('python')

  useEffect(() => {
    if (category && problemId) {
      Get<GetMyProgramCodeParams, GetMyProgramCodeResults>(`${SERVER_ADDRESS}/getMyProgramCode`, {
        category,
        problemId,
        participantId,
      }).then(res => {
        if (res) {
          setCode(res.code)
          setCodeType(res.codeType)
        }
      })
    }
  }, [problemId, category, participantId])

  return { code, codeType }
}
