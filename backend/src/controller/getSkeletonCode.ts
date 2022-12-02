import { AssessmentData } from '../database/DataBaseDataTypes'
import { GetData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetSkeletonCodeParams, GetSkeletonCodeResults } from '../protocol/GetSkeletonCode'

export const getSkeletonCodeController = Get<GetSkeletonCodeParams, GetSkeletonCodeResults>(async (params) => {
  const snapshot = await GetData<AssessmentData>(
    `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}`
  )
  return { skeleton: snapshot.skeleton ?? '' }
})
