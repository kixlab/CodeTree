import { useState, useEffect } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetSubgoalTreeParams, GetSubgoalTreeResults } from '../protocol/GetSubgoalTree'
import { Get } from '../shared/HttpRequest'

export function useSubgoalTree(lectureName: string, fileName: string) {
  const [subgoalTree, setSubgoalTree] = useState<GetSubgoalTreeResults['tree']>({ label: '', group: [], children: [] })

  useEffect(() => {
    Get<GetSubgoalTreeParams, GetSubgoalTreeResults>(
      `${SERVER_ADDRESS}/getSubgoalTree`,
      {
        lectureName,
        fileName,
      },
      result => {
        setSubgoalTree(result.tree)
      },
      error => window.alert(error.message)
    )
  }, [fileName, lectureName])

  return subgoalTree
}
