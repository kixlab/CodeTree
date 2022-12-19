import { ID, Subgoal } from './Common'

export interface PostSuggestionBySubgoalsParams {
  category: string
  problemId: string
  participantId: ID
  subgoals: Subgoal[]
}

export interface PostSuggestionBySubgoalsResults {
  subgoalsWithSuggestion: (Subgoal & { suggestions: string[] })[]
}
