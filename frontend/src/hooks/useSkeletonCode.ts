import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProblemSkeletonParams, GetProblemSkeletonResults } from '../protocol/GetProblemSkeleton'
import { Get } from '../shared/HttpRequest'

export function useSkeletonCode(
  category: string | undefined,
  problemId: string | undefined,
  mode: 'cpp' | 'javascript' | 'python'
) {
  const [skeletonCode, setSkeletonCode] = useState('')

  useEffect(() => {
    if (!category || !problemId) {
      return
    }

    if (mode === 'cpp') {
      setSkeletonCode('')
      return
    }

    Get<GetProblemSkeletonParams, GetProblemSkeletonResults>(`${SERVER_ADDRESS}/getProblemSkeleton`, {
      category,
      problemId,
      codeType: mode,
    }).then(result => {
      setSkeletonCode(result.code)
    })
  }, [category, mode, problemId])

  return { skeletonCode }
}
