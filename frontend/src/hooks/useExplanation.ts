import { useState, useEffect } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProgramExplanationParams, GetProgramExplanationResults } from '../protocol/GetProgramExplanation'
import { Get } from '../shared/HttpRequest'

export function useExplanation(lecture: string, fileName: string) {
  const [explanations, setExplanations] = useState<string[]>([])

  useEffect(() => {
    Get<GetProgramExplanationParams, GetProgramExplanationResults>(
      `${SERVER_ADDRESS}/getProgramExplanation`,
      {
        lectureName: lecture,
        fileName: fileName.split('.')[0],
      },
      result => {
        setExplanations(result.explanations)
      },
      error => window.alert(error.message)
    )
  }, [fileName, lecture])

  return { explanations }
}
