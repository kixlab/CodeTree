import { Get } from '../HttpResponse'
import { GetMostSimilarCodeParams, GetMostSimilarCodeResults } from '../protocol/GetMostSimilarCode'
import { codeSubmissionService } from '../service/codeSubmission'

export const getMostSimilarCodeController = Get<GetMostSimilarCodeParams, GetMostSimilarCodeResults>(
  async ({ category, problemId }) => {
    const submissions = await codeSubmissionService.getSubmissions(category, problemId)

    const randomLearner = Object.keys(submissions)[Math.floor(Math.random() * Object.keys(submissions).length)]

    const { code } = await codeSubmissionService.getLatestSubmissionOfParticipant(category, problemId, randomLearner)

    return { code }
  }
)
