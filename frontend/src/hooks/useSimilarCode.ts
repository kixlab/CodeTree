import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetMostSimilarCodeParams, GetMostSimilarCodeResults } from '../protocol/GetMostSimilarCode'
import { Get } from '../shared/HttpRequest'

export function useMostSimilarCode(category: string | undefined, problemId: string | undefined, code: string) {
  const [mostSimilarCode, setMostSimilarCode] = useState('')

  useEffect(() => {
    if (category && problemId && code.length > 0) {
      Get<GetMostSimilarCodeParams, GetMostSimilarCodeResults>(`${SERVER_ADDRESS}/getMostSimilarCode`, {
        category,
        problemId,
        code,
      }).then(res => {
        if (res) {
          setMostSimilarCode(res.code)
        }
      })
    }
  }, [problemId, category, code])

  return { mostSimilarCode }
}
