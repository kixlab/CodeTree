import { ParsonsAnswerData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostParsonsAnswerParams, PostParsonsAnswerResults } from '../protocol/PostParsonsAnswer'

export const postParsonsAnswerController = Post<PostParsonsAnswerParams, PostParsonsAnswerResults>(
  async (params) => {
    await UpdateData<ParsonsAnswerData>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/submissions/${params.participantId}`,
      { answerList: params.answerList.join(', ') })
    return {}
  }
)
