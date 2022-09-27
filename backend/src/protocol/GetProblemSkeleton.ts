export interface GetProblemSkeletonParams {
  category: string
  problemId: string
  codeType: 'python' | 'javascript'
}

export interface GetProblemSkeletonResults {
  code: string
}
