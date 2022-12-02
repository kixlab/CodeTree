import { ProgressData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostParticipantProgressParams, PostParticipantProgressResult } from '../protocol/PostParticipantProgress'

export const postParticipantProgressController = Post<PostParticipantProgressParams, PostParticipantProgressResult>(
  async (params) => {
    await UpdateData<ProgressData>(`/experiment/participants/${params.participantId}/progress/${params.stage}`, {
      timeRemaining: params.timeRemaining,
    })
    return {}
  }
)
