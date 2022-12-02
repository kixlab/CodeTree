export interface GetVotingListParams {
  lectureName: string
  fileName: string
  participantId: string
}

export interface VotingItem {
  id: number
  group: number[]
  labels: string[]
  answers: number[]
}

export interface GetVotingListResults {
  votingItems: VotingItem[]
}
