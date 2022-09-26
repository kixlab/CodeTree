import { Post } from '../HttpResponse'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { shellRunService } from '../service/shellRun'
import { storageService } from '../service/storage'

type Result = [boolean, string, string, string]

const PythonSolutionTemplate = (code: string, args: string) => `${code}\n\nprint(solution(${args}))`

export const postPracticeAnswerController = Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
  async ({ code, problemId, codeType, category }, send) => {
    try {
      const answerCode = await storageService.getFile(`${category}/${problemId}/solution.py`)
      if (!answerCode) {
        throw new Error('비교할 정답 파일을 불러올 수 없습니다.')
      }
      const testCases = await (await storageService.getFile(`${category}/${problemId}/testcases`)).split('\n')
      if (!testCases) {
        throw new Error('테스트 케이스를 불러올 수 없습니다.')
      }
      const results: Result[] = await Promise.all(
        testCases?.map(async args => {
          let result: string[] = []
          let answerResult: string[] = []
          if (codeType === 'python3') {
            result = await shellRunService.runPython(PythonSolutionTemplate(code, args))
            answerResult = await shellRunService.runPython(PythonSolutionTemplate(answerCode, args))
          } else if (codeType === 'c++') {
            result = await shellRunService.runCpp(PythonSolutionTemplate(code, args))
            answerResult = await shellRunService.runCpp(PythonSolutionTemplate(answerCode, args))
          }

          return [
            result.toString() === answerResult.toString(),
            result.toString(),
            answerResult.toString(),
            args,
          ] as Result
        }) ?? []
      )

      console.log(results)

      send(200, {
        output: results
          .filter(r => r[0] === false)
          .map(r => {
            return `입력: ${r[3]}\n출력: ${r[1]}\n기대출력: ${r[2]}\n`
          })
          .join('\n'),
        correct: results.every(r => r[0]),
      })
    } catch (err) {
      send(200, { output: (err as { message: string }).message, correct: false })
    }
  }
)
