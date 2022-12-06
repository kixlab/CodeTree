import { SubgoalData } from '../database/DataBaseDataTypes'
import { GetData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetMySubgoalsParams, GetMySubgoalsResults } from '../protocol/GetMySubgoals'

export const getMySubgoalsController = Get<GetMySubgoalsParams, GetMySubgoalsResults>(
  async ({ category, problemId, participantId }) => {
    const snapshots = await GetData<SubgoalData[]>(`/${category}/${problemId}/subgoals/${participantId}`)

    return { subgoals: snapshots }
  }
)
