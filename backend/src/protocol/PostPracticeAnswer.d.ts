export interface PostPracticeAnswerParams {
  code: string
  codeType: 'python' | 'javascript' | 'cpp'
  category: string
  problemId: string,
  participantId: string
}

export interface PostPracticeAnswerResults {
  correctCases: number
  testcases: number
  output: {
    input: string
    output: string
    expected: string
  }[]
}
