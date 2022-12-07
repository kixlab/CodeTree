import { Post } from '../HttpResponse'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { judgeService } from '../service/judge'
import { logService } from '../service/log'
import { storageService } from '../service/storage'

export const postPracticeAnswerController = Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
  async ({ code, problemId, codeType, category, participantId }) => {
    logService.logPracticeSubmission(category, problemId, participantId, code)

    const inFiles = await storageService.getFiles(`${category}/${problemId}/in/`)
    const outFiles = await storageService.getFiles(`${category}/${problemId}/out/`)

    const results = await Promise.all(
      inFiles.map(async (input, i) => {
        const key = `p${participantId}-${problemId}-${i}`
        return await judgeService.test(key, input.content, outFiles[i].content, code, codeType)
      })
    )

    const score = results.reduce((prev, cur) => (cur[0] ? prev + 1 : prev), 0)

    return {
      correctCases: score,
      testcases: results.length,
    }
  }
)
