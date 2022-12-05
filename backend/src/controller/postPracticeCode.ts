import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { SetData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'

export const postPracticeCodeController = Post<PostPracticeCodeParams, PostPracticeCodeResults>(
  async ({ lectureName, fileName, participantId, code }) => {
    await SetData<CodeSubmissionData>(`/result/${lectureName}/${fileName}/${participantId}/${Date.now()}`, { code })
    return {}
  }
)
