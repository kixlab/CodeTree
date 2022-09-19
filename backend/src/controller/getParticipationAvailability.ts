import { ExperimentData } from '../database/DataBaseDataTypes'
import { GetData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import {
  GetParticipationAvailabilityParams,
  GetParticipationAvailabilityResults,
} from '../protocol/GetParticipationAvailability'

export const getParticipationAvailabilityController = Get<
  GetParticipationAvailabilityParams,
  GetParticipationAvailabilityResults
>(async (_, send) => {
  try {
    const snapshot = await GetData2<ExperimentData>(`/experiment`)

    if (snapshot === null) {
      throw new Error('No snapshot')
    }

    const maxParticipantNum: number = snapshot.group.maxParticipantNum ?? 40
    const participants = snapshot.participants ?? []
    if (Object.keys(participants).length < maxParticipantNum) {
      send(200, { availabiltiy: true })
    } else {
      send(200, { availabiltiy: false })
    }
  } catch (err) {
    send(500, {
      message: '실험 참여 여부를 확인하는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error: err,
    })
  }
})
