import { Post } from '../HttpResponse'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { logService } from '../service/log'

export const postPracticeCodeController = Post<PostPracticeCodeParams, PostPracticeCodeResults>(
  async ({ lectureName, fileName, participantId, code }) => {
    logService.logPracticeSubmission(lectureName, fileName, participantId, code)

    return {}
  }
)
