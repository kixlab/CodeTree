import { SubgoalData } from '../database/DataBaseDataTypes'
import { SetData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostSubgoalsParams, PostSubgoalsResults } from '../protocol/PostSubgoals'

export const postSubgoalsController = Post<PostSubgoalsParams, PostSubgoalsResults>(async params => {
  await SetData<SubgoalData[]>(
    `/${params.lectureName}/${params.fileName.split('.')[0]}/subgoals/${params.participantId}`,
    params.subgoals.map(subgoal => {
      return {
        label: subgoal.label,
        group: subgoal.group,
        parentId: subgoal.parentId,
      }
    })
  )
  return {}
})
