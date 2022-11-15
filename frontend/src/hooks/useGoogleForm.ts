import React, { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getId, nextStage } from '../shared/ExperimentHelper'

export function useGoogleForm(push: RouteComponentProps['history']['push']) {
  const participantID = getId()
  const [isInitialLoad, setIsInitialLoad] = React.useState(true)

  const onUrlChange = useCallback(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
    } else {
      push(nextStage())
    }
  }, [isInitialLoad, push])

  return { participantID, onUrlChange }
}
