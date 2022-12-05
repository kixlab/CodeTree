import { CodeType } from './Common'

export interface PostPracticeAnswerParams {
  code: string
  codeType: CodeType
  category: string
  problemId: string
  participantId: string
}

export interface PostPracticeAnswerResults {
  correctCases: number
  testcases: number
}
