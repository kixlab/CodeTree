import { ExperimentData } from '../database/DataBaseDataTypes'
import { GetData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import {
  GetParticipationAvailabilityParams,
  GetParticipationAvailabilityResults,
} from '../protocol/GetParticipationAvailability'

export const getParticipationAvailabilityController = Get<
  GetParticipationAvailabilityParams,
  GetParticipationAvailabilityResults
>(async () => {
  const snapshot = await GetData<ExperimentData>(`/experiment`)

  const maxParticipantNum: number = snapshot.group.maxParticipantNum ?? 40
  const participants = snapshot.participants ?? []
  if (Object.keys(participants).length < maxParticipantNum) {
    return { availabiltiy: true }
  } else {
    return { availabiltiy: false }
  }
})
