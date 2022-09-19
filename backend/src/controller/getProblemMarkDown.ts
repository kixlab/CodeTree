import { Get } from '../HttpResponse'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { storageService } from '../service/storage'

export const getProblemMarkDownController = Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(
  async (params, send) => {
    try {
      const markdown = await storageService.getFile(`${params.lectureName}/${params.fileName.split('.')[0]}.prob.md`)
      send(200, { problem: markdown })
    } catch (error) {
      send(500, {
        message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
        error,
      })
    }
  }
)
