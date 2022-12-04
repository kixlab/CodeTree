import { PythonSolutionTemplate, JavascriptSolutionTemplate } from '../constants/codeTemplates'
import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { SetData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { shellRunService } from '../service/shellRun'
import { storageService } from '../service/storage'

type Result = [boolean, string, string, string]

export const postPracticeAnswerController = Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
  async ({ code, problemId, codeType, category, participantId }) => {
    await SetData<CodeSubmissionData>(`/result/${category}/${problemId}/${participantId}/${Date.now()}`, { code })

    const inFiles = await storageService.getFiles(`${category}/${problemId}/in/`)
    const outFiles = await storageService.getFiles(`${category}/${problemId}/out/`)

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

    return{
      correctCases: score,
      testcases: results.length,
      output: results
        .filter(r => r[0] === false)
        .map(r => {
          return {
            input: r[3],
            output: r[1],
            expected: r[2],
          }
        }),
    }
  }
)
