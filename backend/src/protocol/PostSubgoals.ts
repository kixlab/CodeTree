export interface PostSubgoalsParams {
  participantId: string
  lectureName: string
  fileName: string
  subgoals: Subgoal[]
}

export interface Subgoal {
  label: string
  group: number[]
}

export interface PostSubgoalsResults {}
