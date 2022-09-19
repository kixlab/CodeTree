import { ProgressData } from '../database/DataBaseDataTypes'
import { UpdateData2 } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostParticipantProgressParams, PostParticipantProgressResult } from '../protocol/PostParticipantProgress'

export const postParticipantProgressController = Post<PostParticipantProgressParams, PostParticipantProgressResult>(
  async (params, send) => {
    await UpdateData2<ProgressData>(`/experiment/participants/${params.participantId}/progress/${params.stage}`, {
      timeRemaining: params.timeRemaining,
    })
    send(200, {})
  }
)
