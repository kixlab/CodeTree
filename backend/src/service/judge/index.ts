import { PythonSolutionTemplate, JavascriptSolutionTemplate, CppSolutionTemplate } from '../../constants/codeTemplates'
import { CodeType } from '../../protocol/Common'
import { judgeCpp, runJavascript, runPython } from './shellRun'

type Result = [boolean, string, string, string]

class JudgeService {
  async test(key: string, input: string, output: string, code: string, codeType: CodeType): Promise<Result> {
    try {
      let result = ''
      const args = input.split('\n')

      if (codeType === 'python') {
        result = await runPython(key, PythonSolutionTemplate(code, ...args))
      } else if (codeType === 'javascript') {
        result = await runJavascript(key, JavascriptSolutionTemplate(code, ...args))
      } else if (codeType === 'cpp') {
        const nums = JSON.parse(args[0])
        const stdin = `${args[1]}\n${nums.length}\n${nums.join(' ')}`

        result = await judgeCpp(CppSolutionTemplate(code), stdin)
        result = `[${result.slice(0, -1)}]`
      }
      result = result.replace(/(\n| )/g, '')
      const expected = output.replace(/(\n| )/g, '')

      return [result === expected, result, expected, input]
    } catch (e) {
      return [false, `${e}`, '', input]
    }
  }
}

export const judgeService = new JudgeService()
