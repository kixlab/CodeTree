export interface GetProblemSkeletonParams {
  category: string
  problemId: string
  codeType: 'python' | 'javascript' | 'cpp'
}

export interface GetProblemSkeletonResults {
  code: string
}
