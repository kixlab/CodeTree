import { Assessment5Data } from '../database/DataBaseDataTypes'
import { GetData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetParsonsListParams, GetParsonsListResults } from '../protocol/GetParsonsList'

export const getParsonsListController = Get<GetParsonsListParams, GetParsonsListResults>(async (params) => {
  const snapshot = await GetData2<Assessment5Data>(
    `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}`
  )
  return { list: snapshot.list }
})
