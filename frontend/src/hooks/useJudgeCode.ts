import { useCallback, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { CodeType } from '../protocol/Common'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { PostPracticeRunParams, PostPracticeRunResults } from '../protocol/PostPracticeRun'
import { getId } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { ID_NOT_FOUND } from './useExperiment'

export function useJudgeCode(
  code: string,
  category: string | undefined,
  problemId: string | undefined,
  mode: CodeType
) {
  const [programOutput, setProgramOutput] = useState<null | PostPracticeRunResults['output']>(null)
  const [outputCorrect, setOutputCorrect] = useState<boolean | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [judgeResult, setJudgeResult] = useState<string>('')

  const run = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsRunning(true)
    setOutputCorrect(null)

    const res = await Post<PostPracticeRunParams, PostPracticeRunResults>(`${SERVER_ADDRESS}/postPracticeRun`, {
      code,
      category,
      problemId,
      codeType: mode,
      participantId: getId() ?? ID_NOT_FOUND,
    })
    if (res) {
      setProgramOutput([...res.output])
      setOutputCorrect(res.correctCases === res.testcases)
      setJudgeResult(`${res.correctCases} / ${res.testcases} ${getString('practice_result')}`)
    }
    setIsRunning(false)
  }, [category, code, mode, problemId])

  const judge = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsRunning(true)
    setOutputCorrect(null)

    const res = await Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
      `${SERVER_ADDRESS}/postPracticeAnswer`,
      {
        code,
        category,
        problemId,
        codeType: mode,
        participantId: getId() ?? ID_NOT_FOUND,
      }
    )
    if (res) {
      setProgramOutput([])
      setOutputCorrect(res.correctCases === res.testcases)
      setJudgeResult(`${res.correctCases} / ${res.testcases} ${getString('practice_result')}`)
    }
    setIsRunning(false)
  }, [category, code, mode, problemId])

  return {
    judge,
    run,
    programOutput,
    outputCorrect,
    judgeResult,
    isRunning,
  }
}
