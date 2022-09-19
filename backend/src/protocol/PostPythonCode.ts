export interface PostPythonCodeParams {
  code: string
  lectureName: string
  fileName: string
}

export interface PostPythonCodeResults {
  output: string
  correct: boolean
}
