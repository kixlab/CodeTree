import { Subgoal } from './Common'

export interface GetMySubgoalsParams {
  category: string
  problemId: string
  participantId: string
}

export interface GetMySubgoalsResults {
  subgoals: Subgoal[]
}
