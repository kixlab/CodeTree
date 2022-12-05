import { Group, ID } from "./Common"

export interface GetParticipantStatusParams {
  participantId: ID
}

export interface GetParticipantStatusResults {
  group: Group
  lastStage: number
  lastTimestamp: EpochTimeStamp
}
