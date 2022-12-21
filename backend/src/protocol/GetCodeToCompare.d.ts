import { CodeType } from './Common'

export interface GetCodeToCompareParams {
  category: string
  problemId: string
  code: string
}

export interface GetCodeToCompareResults {
  code: string
}
