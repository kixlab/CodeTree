import { ID } from './Common'

export interface GetAlgorithmSuggestionParams {
  category: string
  problemId: string
  participantId: ID
  subgoal: string
}

export interface GetAlgorithmSuggestionResults {
  suggestions: string[]
}
