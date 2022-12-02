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

    const answerResult = outFile.replace(/(\n| )/g, '')
    const isClear = shellRunService.clearPython(participantId, problemId, 1)
    if (!isClear) throw new Error('파일이 정상적으로 삭제되지 않았습니다.')

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
