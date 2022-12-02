import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProgramCodeParams, GetProgramCodeResults } from '../protocol/GetProgramCode'
import { Get } from '../shared/HttpRequest'

export function useCode(lectureName: string | undefined, fileName: string | undefined) {
  const [code, setCode] = useState('')

  useEffect(() => {
    if (lectureName && fileName) {
      Get<GetProgramCodeParams, GetProgramCodeResults>(`${SERVER_ADDRESS}/getProgramCode`, {
        lectureName,
        fileName,
      }).then(result => {
        setCode(result.code)
      })
    }
  }, [fileName, lectureName])

  return code
}
