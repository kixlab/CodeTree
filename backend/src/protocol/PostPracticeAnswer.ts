export interface PostPracticeAnswerParams {
  code: string
  codeType: 'python' | 'javascript'
  category: string
  problemId: string
}

export interface PostPracticeAnswerResults {
  output: string
  correct: boolean
}
