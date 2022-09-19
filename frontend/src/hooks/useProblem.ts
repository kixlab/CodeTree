import { useState, useEffect } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { Get } from '../shared/HttpRequest'

export function useProblem(lectureName: string, fileName: string) {
  const [problem, setProblem] = useState('')

  useEffect(() => {
    Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(
      `${SERVER_ADDRESS}/getProblemMarkDown`,
      {
        lectureName,
        fileName,
      },
      result => {
        setProblem(result.problem)
      },
      error => window.alert(error.message)
    )
  }, [fileName, lectureName])

  return problem
}
