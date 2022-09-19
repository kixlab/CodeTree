import { ExampleData, PracticeData, AssessmentData, Assessment5Data } from '../database/DataBaseDataTypes'
import { GetData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetProblemParams, GetProblemResults } from '../protocol/GetProblem'

export const getProblemController = Get<GetProblemParams, GetProblemResults>(async (params, send) => {
  try {
    const snapshot = await GetData2<ExampleData | PracticeData | AssessmentData | Assessment5Data>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}`
    )
    if (snapshot === null) {
      throw new Error(`no snapshot ${params}`)
    }
    send(200, { problem: snapshot.problem })
  } catch (error) {
    send(500, {
      message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error,
    })
  }
})
