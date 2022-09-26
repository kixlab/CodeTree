import { PythonShell } from 'python-shell'

class ShellRunService {
  pythonShellOptions = {
    mode: 'text' as const,
    pythonOptions: ['-I'],
  }

  async runPython(code: string): Promise<string[]> {
    let shell: PythonShell
    return Promise.race([
      new Promise<string[]>((resolve, reject) => {
        shell = PythonShell.runString(code, this.pythonShellOptions, (err, result) => {
          if (err) {
            return reject(err)
          }
          resolve(result as string[])
        })
      }),
      new Promise<string[]>((_, reject) => {
        setTimeout(() => {
          shell.terminate()
          reject(new Error('Time limit exceeded'))
        }, 4000)
      }),
    ])
  }

  async runCpp(code: string): Promise<string[]> {
    return Promise.race([
      new Promise<string[]>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Time limit exceeded'))
        }, 4000)
      }),
    ])
  }
}

export const shellRunService = new ShellRunService()
