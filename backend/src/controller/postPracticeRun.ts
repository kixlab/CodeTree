import { Post } from '../HttpResponse'
import { PostPracticeRunParams, PostPracticeRunResults } from '../protocol/PostPracticeRun'
import { judgeService } from '../service/judge'
import { logService } from '../service/log'
import { storageService } from '../service/storage'

export const postPracticeRunController = Post<PostPracticeRunParams, PostPracticeRunResults>(
  async ({ code, problemId, codeType, category, participantId }) => {
    logService.logPracticeSubmission(category, problemId, participantId, code)

    const inFiles = await storageService.getFiles(`${category}/${problemId}/in/`)
    const outFiles = await storageService.getFiles(`${category}/${problemId}/out/`)

    const results = await Promise.all(
      inFiles.slice(0, 5).map(async (input, i) => {
        const key = `p${participantId}-${problemId}-${i}`
        return await judgeService.test(key, input, outFiles[i], code, codeType)
      })
    )

    const score = results.reduce((prev, cur) => (cur[0] ? prev + 1 : prev), 0)

    return {
      correctCases: score,
      testcases: results.length,
      output: results.map(r => {
        return {
          input: r[3],
          output: r[1],
          expected: r[2],
          correct: r[0],
        }
      }),
    }
  }
)
