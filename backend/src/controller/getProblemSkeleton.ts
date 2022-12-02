import { Get } from '../HttpResponse'
import { GetProblemSkeletonParams, GetProblemSkeletonResults } from '../protocol/GetProblemSkeleton'
import { storageService } from '../service/storage'

export const getProblemSkeletonController = Get<GetProblemSkeletonParams, GetProblemSkeletonResults>(
  async ({ category, problemId, codeType }) => {
    const code = await storageService.getFile(`${category}/${problemId}/skeleton.${codeType}`)
    return { code }
  }
)
