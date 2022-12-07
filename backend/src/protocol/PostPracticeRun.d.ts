export interface PostPracticeRunParams {
  code: string
  codeType: 'python' | 'javascript' | 'cpp'
  category: string
  problemId: string
  participantId: string
}

export interface PostPracticeRunResults {
  correctCases: number
  testcases: number
  output: {
    input: string
    output: string
    expected: string
    correct: boolean
  }[]
}
