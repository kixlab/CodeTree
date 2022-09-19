import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'

export const postPracticeCodeController = Post<PostPracticeCodeParams, PostPracticeCodeResults>(
  async (params, send) => {
    UpdateData<CodeSubmissionData>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/submissions/${params.participantId}`,
      { code: params.code },
      () => send(200, {}),
      err =>
        send(500, {
          message: '코드 제출에 실패하였습니다. 다시 한 번 시도해주세요.',
          errorMessage: err,
        })
    )
  }
)
