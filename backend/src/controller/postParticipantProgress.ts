import { ParticipantData, ProgressData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostParticipantProgressParams, PostParticipantProgressResult } from '../protocol/PostParticipantProgress'

export const postParticipantProgressController = Post<PostParticipantProgressParams, PostParticipantProgressResult>(
  async ({ participantId, stage, timeRemaining }) => {
    await UpdateData<ProgressData>(`/experiment/participants/${participantId}/progress/${stage}`, {
      timeRemaining: timeRemaining,
    })
    await UpdateData<ParticipantData>(`/experiment/participants/${participantId}`, {
      lastTimestamp: Date.parse(new Date().toISOString()),
    })
    return {}
  }
)
