import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { UpdateData2 } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'

export const postPracticeCodeController = Post<PostPracticeCodeParams, PostPracticeCodeResults>(
  async (params) => {
    await UpdateData2<CodeSubmissionData>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/submissions/${params.participantId}`,
      { code: params.code }
    )
    return {}
  }
)
