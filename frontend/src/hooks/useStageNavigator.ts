import { useCallback, useState } from 'react'

export function useStageNavigator() {
  const [currentStage, setCurrentStage] = useState(0)
  const [maxStage, setMaxStage] = useState(0)
  const [reached, setReached] = useState(0)

  const incReached = useCallback(() => {
    setReached(reached + 1)
  }, [reached])

  const next = useCallback(() => {
    setCurrentStage(Math.min(currentStage + 1, maxStage))
  }, [currentStage, maxStage])

  const prev = useCallback(() => {
    setCurrentStage(Math.max(currentStage - 1, 0))
  }, [currentStage])

  return {
    currentStage,
    maxStage,
    reached,
    incReached,
    next,
    prev,
    setMaxStage,
  }
}
