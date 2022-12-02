import { GroupData } from '../database/DataBaseDataTypes'
import { GetData2, UpdateData2 } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostParticipantFinishedParams, PostParticipantFinishedResult } from '../protocol/PostParticipantFinished'

export const postParticipantFinishedController = Post<PostParticipantFinishedParams, PostParticipantFinishedResult>(
  async (params) => {
    const snapshot = await GetData2<GroupData>(`/experiment/group`)
    if (snapshot && !snapshot.finishedParticipants?.includes(params.participantId)) {
      await UpdateData2<GroupData>(
        `/experiment/group`,
        {
          [params.group]: (snapshot[params.group] || 0) + 1,
          finishedParticipants: [...(snapshot.finishedParticipants || []), params.participantId],
        })
      return {}
    } else {
      throw new Error('실험 완료가 제대로 보고되지 않았습니다. 페이지를 다시 로드해주세요.')
    }
  }
)
