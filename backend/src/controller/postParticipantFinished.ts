import { GroupData } from '../database/DataBaseDataTypes'
import { GetData, UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostParticipantFinishedParams, PostParticipantFinishedResult } from '../protocol/PostParticipantFinished'

export const postParticipantFinishedController = Post<PostParticipantFinishedParams, PostParticipantFinishedResult>(
  async (params, send) => {
    GetData<GroupData>(
      `/experiment/group`,
      snapshot => {
        if (!snapshot.finishedParticipants?.includes(params.participantId)) {
          UpdateData<GroupData>(
            `/experiment/group`,
            {
              [params.group]: (snapshot[params.group] || 0) + 1,
              finishedParticipants: [...(snapshot.finishedParticipants || []), params.participantId],
            },
            () => send(200, {}),
            err =>
              send(500, {
                message: '실험 완료가 제대로 보고되지 않았습니다. 페이지를 다시 로드해주세요.',
                error: err,
              })
          )
        } else {
          send(200, {})
        }
      },
      err =>
        send(500, {
          message: '실험 완료가 제대로 보고되지 않았습니다. 페이지를 다시 로드해주세요.',
          error: err,
        })
    )
  }
)
