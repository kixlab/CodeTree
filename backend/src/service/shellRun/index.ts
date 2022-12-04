import { exec, spawnSync } from 'child_process'
import fs from 'fs/promises'

class ShellRunService {
  private execPromise(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout) => {
        if (error) {
          reject(error)
          return
        }

        resolve(stdout.trim())
      })
    })
  }

  async runPython(participantId: string, problemId: string, testNumber: number, code: string): Promise<string> {
    const name = `p${participantId}-${problemId}-${testNumber}`

    await fs.writeFile(`${name}.py`, code)
    await this.execPromise(`python3 ${name}.py > ${name}.out`)

    const resp = (await fs.readFile(`${name}.out`)).toString()
    return resp
  }

  async clearPython(participantId: string, problemId: string, testNumber: number) {
    try {
      const name = `p${participantId}-${problemId}-${testNumber}`

      await fs.unlink(`${name}.py`)
      await fs.unlink(`${name}.out`)

      return true
    } catch (error) {
      return false
    }
  }

  async judgeCpp(code: string, stdin: string): Promise<string> {
    await fs.writeFile('test.cpp', code)
    await this.execPromise('g++ -o test test.cpp')

    const output = spawnSync('./test', [], { input: stdin })
    return output.stdout.toString()
  }

  async runJavascript(participantId: string, problemId: string, testNumber: number, code: string): Promise<string> {
    const name = `p${participantId}-${problemId}-${testNumber}`

    await fs.writeFile(`${name}.js`, code)
    await this.execPromise(`node ${name}.js > ${name}.out`)

    const resp = (await fs.readFile(`${name}.out`)).toString()
    return resp
  }

  async clearJavascript(participantId: string, problemId: string, testNumber: number) {
    try {
      const name = `p${participantId}-${problemId}-${testNumber}`

      await fs.unlink(`${name}.js`)
      await fs.unlink(`${name}.out`)

      return true
    } catch (error) {
      return false
    }
  }
}

export const shellRunService = new ShellRunService()
