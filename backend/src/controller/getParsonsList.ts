import { Assessment5Data } from '../database/DataBaseDataTypes'
import { GetData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetParsonsListParams, GetParsonsListResults } from '../protocol/GetParsonsList'

export const getParsonsListController = Get<GetParsonsListParams, GetParsonsListResults>(async (params, send) => {
  try {
    const snapshot = await GetData2<Assessment5Data>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}`
    )
    if (snapshot === null) {
      throw new Error(`no snapshot ${params}`)
    }
    send(200, { list: snapshot.list })
  } catch (error) {
    send(500, {
      message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error,
    })
  }
})
