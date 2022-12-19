import { VotingItem } from './Common'

export interface GetVotingListParams {
  lectureName: string
  fileName: string
  participantId: string
}

export interface GetVotingListResults {
  votingItems: VotingItem[]
}
