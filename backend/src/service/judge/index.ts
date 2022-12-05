import { PythonSolutionTemplate, JavascriptSolutionTemplate, CppSolutionTemplate } from '../../constants/codeTemplates'
import { CodeType } from '../../protocol/Common'
import { judgeCpp, runJavascript, runPython } from './shellRun'

type Result = [boolean, string, string, string]

class JudgeService {
  async test(key: string, input: string, output: string, code: string, codeType: CodeType): Promise<Result> {
    try {
      let output = ''
      const args = input.split('\n')

      if (codeType === 'python') {
        output = await runPython(key, PythonSolutionTemplate(code, ...args))
      } else if (codeType === 'javascript') {
        output = await runJavascript(key, JavascriptSolutionTemplate(code, ...args))
      } else if (codeType === 'cpp') {
        const nums = JSON.parse(args[0])
        const stdin = `${args[1]}\n${nums.length}\n${nums.join(' ')}`

        output = await judgeCpp(CppSolutionTemplate(code), stdin)
        output = `[${output.slice(0, -1)}]`
      }
      output = output.replace(/(\n| )/g, '')
      const expected = output.replace(/(\n| )/g, '')

      return [output === expected, output, expected, input]
    } catch (e) {
      return [false, `${e}`, '', input]
    }
  }
}

export const judgeService = new JudgeService()
