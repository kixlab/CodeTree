import { Subgoal } from './Common'

export interface PostSubgoalsParams {
  participantId: string
  lectureName: string
  fileName: string
  subgoals: Subgoal[]
}

export interface PostSubgoalsResults {}
