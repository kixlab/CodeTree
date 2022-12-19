import { useState, useCallback, useMemo } from 'react'
import { CheckBoxAvailability } from '../types/checkboxAvailability'

export function useHighlightCodeSegment(numberOfLines: number) {
  const [highlightedLines, setHighlightedLines] = useState<number[]>([])

  const onClickGoal = useCallback(
    (id: string) => () => {
      setHighlightedLines(id.split(',').map(s => parseInt(s, 10)))
    },
    []
  )

  const onHoverGoal = useCallback((id: number) => {
    setHighlightedLines([id])
  }, [])

  const checkBoxAvailability = useMemo(() => {
    const availability = Array(numberOfLines).fill(CheckBoxAvailability.AVAILABLE)
    highlightedLines.forEach(line => {
      availability[line] = CheckBoxAvailability.CHECKED
    })
    return availability
  }, [highlightedLines, numberOfLines])

  return { highlightedLines, onClickGoal, onHoverGoal, checkBoxAvailability }
}
