import { useEffect, useMemo, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { Subgoal } from '../protocol/Common'
import { GetMySubgoalsParams, GetMySubgoalsResults } from '../protocol/GetMySubgoals'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'
import { Get } from '../shared/HttpRequest'
import { colorGenerator } from '../shared/Utils'
import { makeSubgoalNode } from './useHierarchyVisualizer'

export function useMySubgoals(category: string | undefined, problemId: string | undefined) {
  const [subgoals, setSubgoals] = useState<Subgoal[]>([])
  const participantId = getId() ?? ID_NOT_FOUND

  const subgoalsWithCode = useMemo(() => {
    const nodes = makeSubgoalNode(
      subgoals.map((subgoal, i) => ({
        id: i,
        labels: [subgoal.label],
        group: subgoal.group,
        answers: [],
      })),
      colorGenerator()
    )
    return nodes
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
