export interface PostVotingChoicesParams {
  lectureName: string
  fileName: string
  votingChoices: VotingChoice[]
  participantId: string
}

export interface VotingChoice {
  id: number
  labels: string[]
}

export interface PostVotingChoicesResults {}
