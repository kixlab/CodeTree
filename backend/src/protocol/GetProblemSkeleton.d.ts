import { CodeType } from './Common'

export interface GetProblemSkeletonParams {
  category: string
  problemId: string
}

export interface GetProblemSkeletonResults {
  skeletons: {
    codeType: CodeType
    content: string
  }[]
}
