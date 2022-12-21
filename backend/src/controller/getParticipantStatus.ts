import { ParticipantData } from '../database/DataBaseDataTypes'
import { Get } from '../HttpResponse'
import { GetData } from '../database/DataBaseRef'
import { GetParticipantStatusParams, GetParticipantStatusResults } from '../protocol/GetParticipantStatus'

export const getParticipantStatusController = Get<GetParticipantStatusParams, GetParticipantStatusResults>(
  async ({ participantId }) => {
    const { group, lastTimestamp, progress } = await GetData<ParticipantData>(
      `/experiment/participants/${participantId}`
    )
    const lastStage = progress ? Object.keys(progress).length : 0
    return { group, lastTimestamp, lastStage }
  }
)
