import { Post } from '../HttpResponse'
import { PostPythonCodeParams, PostPythonCodeResults } from '../protocol/PostPythonCode'
import { shellRunService } from '../service/shellRun'

export const postPythonCodeController = Post<PostPythonCodeParams, PostPythonCodeResults>(
  async ({ code, fileName }, send) => {
    try {
      const results = await shellRunService.runCpp(code)

      const correct = (() => {
        switch (true) {
          case fileName === 'practice1-1.py':
            return results?.[0] === '13.125'
          case fileName === 'practice2-1.py':
            return results?.[0] === '4'
          case fileName === 'practice3-1.py':
            return results?.[0] === '21'
          default:
            return false
        }
      })()

      send(200, { output: results, correct })
    } catch (err) {
      send(200, { output: (err as { message: string }).message, correct: false })
    }
  }
)
