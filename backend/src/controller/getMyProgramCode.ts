import { Get } from '../HttpResponse'
import { GetMyProgramCodeParams, GetMyProgramCodeResults } from '../protocol/GetMyProgramCode'
import { codeSubmissionService } from '../service/codeSubmission'

export const getMyProgramCodeController = Get<GetMyProgramCodeParams, GetMyProgramCodeResults>(
  async ({ category, problemId, participantId }) => {
    const { code } = await codeSubmissionService.getLatestSubmissionOfParticipant(category, problemId, participantId)

    return { code }
  }
)
