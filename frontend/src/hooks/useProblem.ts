import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { Get } from '../shared/HttpRequest'

export function useProblem(lectureName: string | undefined, fileName: string | undefined) {
  const [problem, setProblem] = useState('')

  useEffect(() => {
    if (lectureName && fileName) {
      Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(`${SERVER_ADDRESS}/getProblemMarkDown`, {
        lectureName,
        fileName,
      }).then(result => setProblem(result.problem))
    }
  }, [fileName, lectureName])

  return problem
}
