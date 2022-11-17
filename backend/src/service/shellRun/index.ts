import { c, cpp, java, node, python } from 'compile-run'

class ShellRunService {
  pythonShellOptions = {
    mode: 'text' as const,
    pythonOptions: ['-I'],
  }

  private async run(
    code: string,
    runner: typeof c | typeof cpp | typeof node | typeof python,
    tle = 10_000
  ): Promise<string> {
    return Promise.race([
      new Promise<string>((resolve, reject) => {
        runner
          .runSource(code)
          .then(result => {
            if (result.stderr) {
              throw new Error(`${result.errorType}: ${result.stderr}`)
            }
            resolve(result.stdout)
          })
          .catch(err => {
            reject(err)
          })
      }),
      new Promise<string>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Time limit exceeded'))
        }, tle)
      }),
    ])
  }

  async runPython(code: string): Promise<string> {
    return this.run(code, python)
  }

  async runJave(code: string): Promise<string> {
    return this.run(code, java)
  }

  async runCpp(code: string): Promise<string> {
    return this.run(code, cpp)
  }

  async runJavascript(code: string): Promise<string> {
    return this.run(code, node)
  }
}

export const shellRunService = new ShellRunService()
