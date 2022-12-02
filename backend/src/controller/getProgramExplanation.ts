import { Get } from '../HttpResponse'
import { GetProgramExplanationParams, GetProgramExplanationResults } from '../protocol/GetProgramExplanation'
import { storageService } from '../service/storage'

export const getProgramExplanationController = Get<GetProgramExplanationParams, GetProgramExplanationResults>(
  async ({ fileName, lectureName }) => {
    const explanation = await storageService.getFile(`cs101_sample_code/${lectureName}/${fileName}.explanation.txt`)
    return { explanations: explanation.split('\n') }
  }
)
