import { SubgoalData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostSubgoalsParams, PostSubgoalsResults } from '../protocol/PostSubgoals'

export const postSubgoalsController = Post<PostSubgoalsParams, PostSubgoalsResults>(async (params, send) => {
  UpdateData<SubgoalData[]>(
    `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoals/${params.participantId}`,
    params.subgoals,
    () => send(200, {}),
    err =>
      send(500, {
        message: '제출에 실패하였습니다. 다시 한 번 시도해주세요.',
        errorMessage: err,
      })
  )
})
