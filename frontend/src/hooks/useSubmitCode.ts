import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { CodeType } from '../protocol/Common'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { Post } from '../shared/HttpRequest'
import { useExperiment } from './useExperiment'

export function useSubmitCode(
  category: string | undefined,
  problemId: string | undefined,
  code: string,
  codeType: CodeType
) {
  const { id, nextStage } = useExperiment()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const submit = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsSubmitting(true)
    const res = await Post<PostPracticeCodeParams, PostPracticeCodeResults>(`${SERVER_ADDRESS}/postPracticeCode`, {
      participantId: id,
      lectureName: category,
      fileName: problemId,
      code,
      codeType,
    })
    setIsSubmitting(false)
    if (res) {
      navigate(await nextStage())
    }
  }, [category, code, codeType, id, navigate, nextStage, problemId])

  return { isSubmitting, submit }
}
