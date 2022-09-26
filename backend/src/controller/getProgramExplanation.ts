import { Get } from '../HttpResponse'
import { GetProgramExplanationParams, GetProgramExplanationResults } from '../protocol/GetProgramExplanation'
import { storageService } from '../service/storage'

export const getProgramExplanationController = Get<GetProgramExplanationParams, GetProgramExplanationResults>(
  async ({ fileName, lectureName }, send) => {
    try {
      const explanation = await storageService.getFile(`cs101_sample_code/${lectureName}/${fileName}.explanation.txt`)
      send(200, { explanations: explanation.split('\n') })
    } catch (error) {
      send(500, {
        message: '문제 설명을 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
        error,
      })
    }
  }
)
