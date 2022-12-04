import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetSubgoalTreeParams, GetSubgoalTreeResults } from '../protocol/GetSubgoalTree'
import { Get } from '../shared/HttpRequest'

export function useSubgoalTree(lectureName: string | undefined, fileName: string | undefined) {
  const [subgoalTree, setSubgoalTree] = useState<GetSubgoalTreeResults['tree']>({ label: '', group: [], children: [] })

  useEffect(() => {
    if (lectureName && fileName) {
      Get<GetSubgoalTreeParams, GetSubgoalTreeResults>(`${SERVER_ADDRESS}/getSubgoalTree`, {
        lectureName,
        fileName,
      }).then(res => {
        if (res) {
          setSubgoalTree(res.tree)
        }
      })
    }
  }, [fileName, lectureName])

  return subgoalTree
}
