import { exec, spawnSync } from 'child_process'
import fs from 'fs/promises'

export function execPromise(command: string): Promise<string> {
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

export async function runPython(key: string, code: string): Promise<string> {
  await fs.writeFile(`${key}.py`, code)
  await execPromise(`python3 ${key}.py > ${key}.out`)

  const resp = (await fs.readFile(`${key}.out`)).toString()
  clearPython(key)
  return resp
}

export async function clearPython(key: string) {
  try {
    await fs.unlink(`${key}.py`)
    await fs.unlink(`${key}.out`)

    return true
  } catch (error) {
    return false
  }
}

export async function judgeCpp(code: string, stdin: string): Promise<string> {
  await fs.writeFile('test.cpp', code)
  await execPromise('g++ -o test test.cpp')

  const output = spawnSync('./test', [], { input: stdin })
  return output.stdout.toString()
}

export async function runJavascript(key: string, code: string): Promise<string> {
  await fs.writeFile(`${key}.js`, code)
  await execPromise(`node ${key}.js > ${key}.out`)

  const resp = (await fs.readFile(`${key}.out`)).toString()
  clearJavascript(key)
  return resp
}

export async function clearJavascript(key: string) {
  try {
    await fs.unlink(`${key}.js`)
    await fs.unlink(`${key}.out`)

    return true
  } catch (error) {
    return false
  }
}
