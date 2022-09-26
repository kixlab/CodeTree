export interface PostPracticeAnswerParams {
  code: string
  codeType: 'python3' | 'c++'
  category: string
  problemId: string
}

export interface PostPracticeAnswerResults {
  output: string
  correct: boolean
}
