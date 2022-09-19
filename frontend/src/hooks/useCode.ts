import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProgramCodeParams, GetProgramCodeResults } from '../protocol/GetProgramCode'
import { Get } from '../shared/HttpRequest'

export function useCode(lectureName: string, fileName: string) {
  const [code, setCode] = useState('')

  useEffect(() => {
    Get<GetProgramCodeParams, GetProgramCodeResults>(
      `${SERVER_ADDRESS}/getProgramCode`,
      {
        lectureName,
        fileName,
      },
      result => {
        setCode(result.code)
      },
      error => window.alert(error.message)
    )
  }, [fileName, lectureName])

  return code
}
