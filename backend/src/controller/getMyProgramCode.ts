import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { GetData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetMyProgramCodeParams, GetMyProgramCodeResults } from '../protocol/GetMyProgramCode'

export const getMyProgramCodeController = Get<GetMyProgramCodeParams, GetMyProgramCodeResults>(async params => {
  const snapshots = await GetData<CodeSubmissionData>(
    `/${params.category}/${params.problemId}/submissions/${params.participantId}`
  )

  let unordered = JSON.parse(JSON.stringify(snapshots))

  let idx = -1
  for (const snapshot in snapshots) {
    if (idx < Number(snapshot)) idx = Number(snapshot)
  }

  const code = unordered[String(idx)].code

  return { code }
})
