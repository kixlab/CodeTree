export interface PostPracticeAnswerParams {
  code: string
  codeType: 'python' | 'javascript' | 'cpp'
  category: string
  problemId: string,
  participantId: string
}

export interface PostPracticeAnswerResults {
  output: string
  correct: boolean
}

export interface PracticeCode {
  code: string
}
