import { CodeType } from './Common'

export interface PostPracticeCodeParams {
  participantId: string
  lectureName: string
  fileName: string
  code: string
  codeType: CodeType
}

export interface PostPracticeCodeResults {}
