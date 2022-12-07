import { Get } from '../HttpResponse'
import { CodeType } from '../protocol/Common'
import { GetProblemSkeletonParams, GetProblemSkeletonResults } from '../protocol/GetProblemSkeleton'
import { storageService } from '../service/storage'

export const getProblemSkeletonController = Get<GetProblemSkeletonParams, GetProblemSkeletonResults>(
  async ({ category, problemId }) => {
    const files = await storageService.getFiles(`${category}/${problemId}/skeleton`)
    const skeletons = files.map(({ name, content }) => {
      const codeType = name.split('.')[1] as CodeType
      return { codeType, content }
    })
    return { skeletons }
  }
)
