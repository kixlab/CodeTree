import { Get } from '../HttpResponse'
import { GetCodeToCompareParams, GetCodeToCompareResults } from '../protocol/GetCodeToCompare'
import { codeSubmissionService } from '../service/codeSubmission'
import { storageService } from '../service/storage'
import { languageToExtension } from '../utils/fileExtension'

export const getCodeToCompareController = Get<GetCodeToCompareParams, GetCodeToCompareResults>(
  async ({ category, problemId }) => {
    const submissions = await codeSubmissionService.getSubmissions(category, problemId)

    const randomLearner = Object.keys(submissions)[Math.floor(Math.random() * Object.keys(submissions).length)]

    const { codeType } = await codeSubmissionService.getLatestSubmissionOfParticipant(
      category,
      problemId,
      randomLearner
    )

    const code = await storageService.getFile(`${category}/${problemId}/suboptimal.${languageToExtension(codeType)}`)

    return { code }
  }
)
