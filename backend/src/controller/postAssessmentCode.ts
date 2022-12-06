import { CodeSubmissionData } from '../database/DataBaseDataTypes'
import { UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostAssessmentCodeParams, PostAssessmentCodeResults } from '../protocol/PostAssessmentCode'

export const postAssessmentCodeController = Post<PostAssessmentCodeParams, PostAssessmentCodeResults>(async params => {
  await UpdateData<CodeSubmissionData>(
    `/assessment/${params.lectureName}/${params.fileName.split('.')[0]}/submissions/${params.participantId}`,
    { code: params.code }
  )
  return {}
})
