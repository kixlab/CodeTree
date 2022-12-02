import { Get } from '../HttpResponse'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { storageService } from '../service/storage'

export const getProblemMarkDownController = Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(
  async (params) => {
    const markdown = await storageService.getFile(`${params.lectureName}/${params.fileName}/problem.md`)
    return { problem: markdown }
  }
)
