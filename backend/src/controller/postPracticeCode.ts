import { Post } from '../HttpResponse'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { codeSubmissionService } from '../service/codeSubmission'

export const postPracticeCodeController = Post<PostPracticeCodeParams, PostPracticeCodeResults>(
  async ({ lectureName, fileName, participantId, code, codeType }) => {
    codeSubmissionService.logPracticeSubmission(lectureName, fileName, participantId, code, codeType)

    return {}
  }
)
