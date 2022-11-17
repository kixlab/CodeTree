import { GetData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetMyProgramCodeParams, GetMyProgramCodeResults } from '../protocol/GetMyProgramCode'
import { PracticeCode } from '../protocol/PostPracticeAnswer'

export const getMyProgramCodeController = Get<GetMyProgramCodeParams, GetMyProgramCodeResults>(async (params, send) => {
  try {
    const snapshots = await GetData2<PracticeCode>(
      `/result/${params.category}/${params.problemId}/${params.participantId}`
    )

    let unordered = JSON.parse(JSON.stringify(snapshots))

    let idx = -1
    for (const snapshot in snapshots) {
      if (idx < Number(snapshot)) idx = Number(snapshot)
    }

    const code = unordered[String(idx)].code

    send(200, { code })
  } catch (error) {
    send(500, {
      message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error,
    })
  }
})
