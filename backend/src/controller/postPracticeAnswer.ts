import { PracticeData } from '../database/DataBaseDataTypes'
import { GetData2 } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPythonCodeParams, PostPythonCodeResults } from '../protocol/PostPythonCode'
import { shellRunService } from '../service/shellRun'
import { storageService } from '../service/storage'

export const postPracticeAnswerController = Post<PostPythonCodeParams, PostPythonCodeResults>(
  async ({ code, fileName, lectureName }, send) => {
    try {
      const answerCode = await storageService.getFile(`${lectureName}/${fileName}`)
      if (!answerCode) {
        throw new Error('비교할 정답 파일을 불러올 수 없습니다.')
      }
      const snapshot = await GetData2<PracticeData>(`/cs101_sample_code/${lectureName}/${fileName.split('.')[0]}`)
      if (!snapshot) {
        throw new Error('테스트 케이스를 불러올 수 없습니다.')
      }
      const results = await Promise.all(
        snapshot.testCases?.map(async ({ args }) => {
          const results = await shellRunService.runPython(
            `from typing import List\n\n${code}\n\nprint(solution(${args}))`
          )
          const answerResults = await shellRunService.runPython(
            `from typing import List\n\n${answerCode}\n\nprint(solution(${args}))`
          )
          return [results.toString() === answerResults.toString(), results.toString(), answerResults.toString(), args]
        }) ?? []
      )

      send(200, {
        output: results
          .filter(r => r[0] === false)
          .map(r => {
            return `Input: ${r[3]}\nYours: ${r[1]}\nExpected: ${r[2]}\n`
          })
          .join('\n'),
        correct: results.every(r => r[0]),
      })
    } catch (err) {
      send(200, { output: (err as { message: string }).message, correct: false })
    }
  }
)
