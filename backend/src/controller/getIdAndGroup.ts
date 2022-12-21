import { GroupData, ParticipantData } from '../database/DataBaseDataTypes'
import { GetData, PushData, UpdateData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetIdAndGroupParams, GetIdAndGroupResults } from '../protocol/GetIdAndGroup'

export const getIdAndGroupController = Get<GetIdAndGroupParams, GetIdAndGroupResults>(async () => {
  const snapshot = await GetData<GroupData>(`/experiment/group`)

  let group: 'A' | 'B' | 'C'
  if (snapshot.lastAssignment === 'A') {
    group = 'B'
  } else if (snapshot.lastAssignment === 'C') {
    group = 'C'
  } else {
    group = 'A'
  }
  await UpdateData<GroupData>(`/experiment/group`, {
    lastAssignment: group,
  })
  const id = await PushData<ParticipantData>(`/experiment/participants`, {
    group,
    time: time2TimeStamp(Date.now()),
    lastTimestamp: Date.parse(new Date().toISOString()),
  })

  return {
    id,
    group,
  }
})

export function time2TimeStamp(time: number): string {
  const date = new Date(time)
  return `${date.getMonth() + 1}/${date.getDate()} @ ${date.getHours()}:${date.getMinutes()}`
}
