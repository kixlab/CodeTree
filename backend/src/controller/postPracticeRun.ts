import { JavascriptSolutionTemplate, PythonSolutionTemplate } from '../constants/codeTemplates'
import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { SetData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeRunParams, PostPracticeRunResults } from '../protocol/PostPracticeRun'
import { shellRunService } from '../service/shellRun'
import { storageService } from '../service/storage'

export const postPracticeRunController = Post<PostPracticeRunParams, PostPracticeRunResults>(
  async ({ code, problemId, codeType, category, participantId }) => {
    await SetData<CodeSubmissionData>(
      `/result/${category}/${problemId}/${participantId}/${Date.now()}`,
      { code }
    )

    const inFile = await storageService.getFile(`${category}/${problemId}/in/t1.in`)
    const outFile = await storageService.getFile(`${category}/${problemId}/out/t1.out`)
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

    const score = answerResult === output ? 1: 0

    return{
      correctCases: score,
      testcases: 1,
      output: [
        {
          input: inFile,
          output,
          expected: answerResult,
        }
      ],
    }
  }
)
