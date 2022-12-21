import { SubgoalData } from '../database/DataBaseDataTypes'
import { GetData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetMySubgoalsParams, GetMySubgoalsResults } from '../protocol/GetMySubgoals'

export const getMySubgoalsController = Get<GetMySubgoalsParams, GetMySubgoalsResults>(
  async ({ category, problemId, participantId }) => {
    const subgoals = (await GetData<SubgoalData[]>(`/${category}/${problemId}/subgoals/${participantId}`)).map(
      subgoal => {
        return {
          label: subgoal.label,
          group: subgoal.group,
          parentId: subgoal.parentId ?? null,
        }
      }
    )

    return { subgoals }
  }
)
