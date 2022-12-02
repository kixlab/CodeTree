import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'

export const postPracticeCodeController = Post<PostPracticeCodeParams, PostPracticeCodeResults>(
  async (params) => {
    await UpdateData<CodeSubmissionData>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/submissions/${params.participantId}`,
      { code: params.code }
    )
    return {}
  }
)
