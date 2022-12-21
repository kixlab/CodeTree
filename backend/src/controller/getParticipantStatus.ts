import { ParticipantData } from '../database/DataBaseDataTypes'
import { Get } from '../HttpResponse'
import { GetData } from '../database/DataBaseRef'
import { GetParticipantStatusParams, GetParticipantStatusResults } from '../protocol/GetParticipantStatus'

export const getParticipantStatusController = Get<GetParticipantStatusParams, GetParticipantStatusResults>(
  async ({ participantId }) => {
    const {
      group,
      lastTimestamp = -1,
      progress,
    } = await GetData<ParticipantData>(`/experiment/participants/${participantId}`)
    const lastStage = progress ? Object.keys(progress).length : -1
    return { group, lastTimestamp, lastStage }
  }
)
