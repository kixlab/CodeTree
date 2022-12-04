import { PythonSolutionTemplate, JavascriptSolutionTemplate } from '../constants/codeTemplates'
import { SetData2 } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeAnswerParams, PostPracticeAnswerResults, PracticeCode } from '../protocol/PostPracticeAnswer'
import { shellRunService } from '../service/shellRun'
import { storageService } from '../service/storage'

type Result = [boolean, string, string, string]

export const postPracticeAnswerController = Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
  async ({ code, problemId, codeType, category, participantId }, send) => {
    try {
      await SetData2<PracticeCode>(`/result/${category}/${problemId}/${participantId}/${Date.now()}`, { code })

      const inFiles = await storageService.getFiles(`${category}/${problemId}/in/`)
      const outFiles = await storageService.getFiles(`${category}/${problemId}/out/`)

      if (!inFiles) {
        throw new Error('테스트 케이스를 불러올 수 없습니다.')
      }
      const results: Result[] = await Promise.all(
        inFiles.map(async (argStr, i) => {
          try {
            let result = ''
            const args = argStr.split('\n')

            if (codeType === 'python') {
              result = await shellRunService.runPython(participantId, problemId, i, PythonSolutionTemplate(code, ...args))
              shellRunService.clearPython(participantId, problemId, i)
            } else if (codeType === 'javascript') {
              result = await shellRunService.runJavascript(participantId, problemId, i, JavascriptSolutionTemplate(code, ...args))
              shellRunService.clearJavascript(participantId, problemId, i)
            } else if (codeType === 'cpp') {
              const nums = JSON.parse(args[0])
              const stdin = `${args[1]}\n${nums.length}\n${nums.join(" ")}`

              result = await shellRunService.judgeCpp(code, stdin)
              result = `[${result.slice(0, -1)}]`
            }
            result = result.replace(/(\n| )/g, '')
            const answer = outFiles[i].replace(/(\n| )/g, '')

            return [result === answer, result, answer, argStr] as Result
          } catch (e) {
            return [false, e, '', argStr] as Result
          }
        }) ?? []
      )

      const score = results.reduce((prev, cur) => (cur[0] ? prev + 1 : prev), 0)

      send(200, {
        output: `${score}/${results.length}\n${results
          .filter(r => r[0] === false)
          .map(r => {
            return `입력: ${r[3]}\n출력: ${r[1]}\n기대출력: ${r[2]}\n`
          })
          .join('\n')}`,
        correct: results.every(r => r[0]),
      })
    } catch (err) {
      send(200, { output: (err as { message: string }).message, correct: false })
    }
  }
)
