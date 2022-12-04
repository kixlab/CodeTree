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

      const inFile = await storageService.getFile(`${category}/${problemId}/in/t1.in`)
      if (!inFile) {
        throw new Error('비교할 정답 파일을 불러올 수 없습니다.')
      }

      const outFile = await storageService.getFile(`${category}/${problemId}/out/t1.out`)
      if (!outFile) {
        throw new Error('테스트 케이스를 불러올 수 없습니다.')
      }

      const sampleArgs = inFile.split('\n')

      let output = ''

      try {
        if (codeType === 'python') {
          output = await shellRunService.runPython(participantId, problemId, 1, PythonSolutionTemplate(code, ...sampleArgs))
          shellRunService.clearPython(participantId, problemId, 1)
        } else if (codeType === 'javascript') {
          output = await shellRunService.runJavascript(participantId, problemId, 1, JavascriptSolutionTemplate(code, ...sampleArgs))
          shellRunService.clearJavascript(participantId, problemId, 1)
        } else if (codeType === 'cpp') {
          const nums = JSON.parse(sampleArgs[0])
          const stdin = `${sampleArgs[1]}\n${nums.length}\n${nums.join(" ")}`

          output = await shellRunService.judgeCpp(code, stdin)
          output = `[${output.slice(0, -1)}]`
        }
        output = output.replace(/(\n| )/g, '')
      } catch (error) {
        console.log(error)
        throw new Error('코드 실행중 에러가 발생하였습니다.')
      }

      const answerResult = outFile.replace(/(\n| )/g, '')

      send(200, {
        output: `입력: ${sampleArgs}\n출력: ${output}\n기대출력: ${answerResult}\n`,
        correct: output === answerResult,
      })
    } catch (err) {
      send(200, { output: (err as { message: string }).message, correct: false })
    }
  }
)
