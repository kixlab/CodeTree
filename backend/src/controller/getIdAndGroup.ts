import { GroupData, ParticipantData } from '../database/DataBaseDataTypes'
import { GetData, UpdateData, PushData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetIdAndGroupParams, GetIdAndGroupResults } from '../protocol/GetIdAndGroup'

export const getIdAndGroupController = Get<GetIdAndGroupParams, GetIdAndGroupResults>(async (_, send) => {
  await GetData<GroupData>(
    `/experiment/group`,
    snapshot => {
      let group: 'A' | 'B' | 'C'
      if (snapshot.lastAssignment === 'A') {
        group = 'B'
      } else if (snapshot.lastAssignment === 'C') {
        group = 'C'
      } else {
        group = 'A'
      }
      UpdateData<GroupData>(`/experiment/group`, {
        lastAssignment: group,
      })
      PushData<ParticipantData>(
        `/experiment/participants`,
        {
          group,
          time: time2TimeStamp(Date.now()),
        },
        key => {
          send(200, {
            id: key,
            group,
          })
        },
        err =>
          send(500, {
            message: '참가자 ID를 발급받는 데에 실패하였습니다. 다시 시도해주세요.',
            error: err,
          })
      )
    },
    err =>
      send(500, {
        message: '참가자 ID를 발급받는 데에 실패하였습니다. 다시 시도해주세요.',
        error: err,
      })
  )
})

export function time2TimeStamp(time: number): string {
  const date = new Date(time)
  return `${date.getMonth() + 1}/${date.getDate()} @ ${date.getHours()}:${date.getMinutes()}`
}
