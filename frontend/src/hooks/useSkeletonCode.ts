import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { CodeType } from '../protocol/Common'
import { GetProblemSkeletonParams, GetProblemSkeletonResults } from '../protocol/GetProblemSkeleton'
import { Get } from '../shared/HttpRequest'

export function useSkeletonCode(category: string | undefined, problemId: string | undefined, mode: CodeType) {
  const [skeletonCode, setSkeletonCode] = useState('')
  const [skeletons, setSkeletons] = useState<GetProblemSkeletonResults['skeletons']>([])

  useEffect(() => {
    if (!category || !problemId) {
      return
    }
    Get<GetProblemSkeletonParams, GetProblemSkeletonResults>(`${SERVER_ADDRESS}/getProblemSkeleton`, {
      category,
      problemId,
    }).then(res => {
      if (res) {
        setSkeletons(res.skeletons)
      }
    })
  }, [category, mode, problemId])

  useEffect(() => {
    const skeleton = skeletons.find(skeleton => skeleton.codeType === mode)
    if (skeleton) {
      setSkeletonCode(skeleton.content)
    }
  }, [mode, skeletons])

  return { skeletonCode }
}
