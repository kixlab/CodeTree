import { ParsonsAnswerData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostParsonsAnswerParams, PostParsonsAnswerResults } from '../protocol/PostParsonsAnswer'

export const postParsonsAnswerController = Post<PostParsonsAnswerParams, PostParsonsAnswerResults>(
  async (params, send) => {
    UpdateData<ParsonsAnswerData>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/submissions/${params.participantId}`,
      { answerList: params.answerList.join(', ') },
      () => send(200, {}),
      err =>
        send(500, {
          message: '제출에 실패하였습니다. 다시 한 번 시도해주세요.',
          errorMessage: err,
        })
    )
  }
)
