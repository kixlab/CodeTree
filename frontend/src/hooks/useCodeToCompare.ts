import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { Get } from '../shared/HttpRequest'
import { GetCodeToCompareParams, GetCodeToCompareResults } from '../protocol/GetCodeToCompare'

export function useCodeToCompare(category: string | undefined, problemId: string | undefined, code: string) {
  const [codeToCompare, setCodeToCompare] = useState('')

  useEffect(() => {
    if (category && problemId && code.length > 0) {
      Get<GetCodeToCompareParams, GetCodeToCompareResults>(`${SERVER_ADDRESS}/getCodeToCompare`, {
        category,
        problemId,
        code,
      }).then(res => {
        if (res) {
          setCodeToCompare(res.code)
        }
      })
    }
  }, [problemId, category, code])

  return { codeToCompare }
}
