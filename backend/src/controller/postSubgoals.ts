import { SubgoalData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostSubgoalsParams, PostSubgoalsResults } from '../protocol/PostSubgoals'

export const postSubgoalsController = Post<PostSubgoalsParams, PostSubgoalsResults>(async (params) => {
  await UpdateData<SubgoalData[]>(
    `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoals/${params.participantId}`,
    params.subgoals)
  return {}
})
