import { CodeType } from './Common'

export interface GetMyProgramCodeParams {
  category: string
  problemId: string
  participantId: string
}

export interface GetMyProgramCodeResults {
  code: string
  codeType: CodeType
}
