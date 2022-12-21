import { useEffect, useMemo, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { ID, Subgoal } from '../protocol/Common'
import { GetMySubgoalsParams, GetMySubgoalsResults } from '../protocol/GetMySubgoals'
import { Get } from '../shared/HttpRequest'
import { colorGenerator } from '../shared/Utils'
import { makeSubgoalNode } from './useHierarchyVisualizer'

export function useMySubgoals(category: string | undefined, problemId: string | undefined, participantId: ID) {
  const [subgoals, setSubgoals] = useState<Subgoal[]>([])

  const subgoalsWithCode = useMemo(() => {
    return makeSubgoalNode(subgoals, colorGenerator())
  }, [subgoals])

  useEffect(() => {
    if (category && problemId) {
      Get<GetMySubgoalsParams, GetMySubgoalsResults>(`${SERVER_ADDRESS}/getMySubgoals`, {
        category,
        problemId,
        participantId,
      }).then(res => {
        if (res) {
          setSubgoals(res.subgoals)
        }
      })
    }
  }, [problemId, participantId, category])

  return subgoalsWithCode
}
