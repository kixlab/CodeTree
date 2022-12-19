import { VotingChoice } from './Common'

export interface PostVotingChoicesParams {
  lectureName: string
  fileName: string
  votingChoices: VotingChoice[]
  participantId: string
}

export interface PostVotingChoicesResults {}
