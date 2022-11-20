import { PythonSolutionTemplate, JavascriptSolutionTemplate } from '../constants/codeTemplates'
import { SetData2 } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeAnswerParams, PostPracticeAnswerResults, PracticeCode } from '../protocol/PostPracticeAnswer'
import { shellRunService } from '../service/shellRun'
import { storageService } from '../service/storage'

export const postPracticeRunController = Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
  async ({ code, problemId, codeType, category, participantId }, send) => {
    try {
      await SetData2<PracticeCode>(
        `/result/${category}/${problemId}/${participantId}/${Date.now()}`,
        { code }
      )

      const answerCode = await storageService.getFile(`${category}/${problemId}/solution.py`)
      if (!answerCode) {
        throw new Error('비교할 정답 파일을 불러올 수 없습니다.')
      }

      const testCases = await storageService.getFiles(`${category}/${problemId}/testcases/`)
      if (!testCases) {
        throw new Error('테스트 케이스를 불러올 수 없습니다.')
      }

      const sampleArgs = testCases[0].split('\n')
      let output = ''

      try {
        if (codeType === 'python') {
          output = await shellRunService.runPython(PythonSolutionTemplate(code, ...sampleArgs))
        } else if (codeType === 'javascript') {
          output = await shellRunService.runJavascript(JavascriptSolutionTemplate(code, ...sampleArgs))
        } else if (codeType === 'cpp') {
          output = await shellRunService.runCpp(code) // TODO: update input type for cpp
        }
        output = output.replace(/(\n| )/g, '')
      } catch (error) {
        console.log(error)
        throw new Error('코드 실행중 에러가 발생하였습니다.')
      }


      const answerResult = (await shellRunService.runPython(PythonSolutionTemplate(answerCode, ...sampleArgs))).replace(
        /(\n| )/g,
        ''
      )

      send(200, {
        output: `입력: ${sampleArgs}\n출력: ${output}\n기대출력: ${answerResult}\n`,
        correct: output === answerResult,
      })
    } catch (err) {
      send(200, { output: (err as { message: string }).message, correct: false })
    }
  }
)
