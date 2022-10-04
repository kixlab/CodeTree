import { Get } from '../HttpResponse'
import { GetProblemSkeletonParams, GetProblemSkeletonResults } from '../protocol/GetProblemSkeleton'
import { storageService } from '../service/storage'

export const getProblemSkeletonController = Get<GetProblemSkeletonParams, GetProblemSkeletonResults>(
  async ({ category, problemId, codeType }, send) => {
    try {
      const code = await storageService.getFile(`${category}/${problemId}/skeleton.${codeType}`)
      send(200, { code })
    } catch (error) {
      send(500, {
        message: '스켈레톤 코드를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
        error,
      })
    }
  }
)
