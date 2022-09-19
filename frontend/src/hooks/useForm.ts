import { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getId, nextStage, shouldMoveStage } from '../shared/ExperimentHelper'

export function useForm(history: RouteComponentProps['history']) {
  const participantID = getId()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    if (shouldMoveStage()) {
      history.push(nextStage())
    }
  }, [history])

  const onUrlChange = useCallback(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
    } else {
      history.push(nextStage())
    }
  }, [history, isInitialLoad])

  return {
    participantID,
    onUrlChange,
  }
}
