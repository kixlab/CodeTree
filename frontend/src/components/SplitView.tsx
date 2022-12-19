import { css } from '@emotion/react'
import styled from '@emotion/styled'
import produce from 'immer'
import React, { DragEvent, useCallback, useEffect } from 'react'
import { Color } from '../shared/Common'

interface Props {
  children: React.ReactNode
  initialWidths?: number[]
}

const BAR_WIDTH = 12

export function SplitView({ children, initialWidths }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const childrenCnt = React.Children.count(children)
  const [draggedbarIndex, setDraggedBarIndex] = React.useState(-1)
  const [widths, setWidths] = React.useState<number[]>([])

  const dragBarStart = useCallback(
    (i: number) => (event: DragEvent) => {
      const img = new Image()
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      event.dataTransfer.setDragImage(img, 0, 0)
      setDraggedBarIndex(i)
    },
    []
  )

  const dragBarEnd = useCallback(() => {
    setDraggedBarIndex(-1)
  }, [])

  const dragBarOver = useCallback(
    (event: DragEvent) => {
      const container = containerRef.current
      if (container && draggedbarIndex >= 0) {
        setWidths(
          produce(widths, draft => {
            const left = draft.slice(0, draggedbarIndex).reduce((s, n) => s + n, 0)
            const diff = event.clientX - left - container.getBoundingClientRect().left - draft[draggedbarIndex]
            draft[draggedbarIndex] += diff
            draft[draggedbarIndex + 1] -= diff
          })
        )
      }
    },
    [draggedbarIndex, widths]
  )

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const fraction = initialWidths?.reduce((s, n) => s + n, 0) ?? childrenCnt
      const width = (containerRef.current?.clientWidth ?? 0) / fraction
      const newWidths = [...Array(childrenCnt)].map((_, i) => (initialWidths?.[i] ?? 1) * width)
      setWidths(newWidths)
    })
    const container = containerRef.current

    if (container) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [childrenCnt, initialWidths])

  return (
    <Container ref={containerRef} onDragOver={dragBarOver}>
      {React.Children.map(children, (child, i) => {
        const hasBar = i < childrenCnt - 1
        return (
          <View hasBar={hasBar} style={{ width: widths[i] }}>
            {child}
            {hasBar && (
              <Bar
                draggable="true"
                isOnDrag={i === draggedbarIndex}
                onDragStart={dragBarStart(i)}
                onDragEnd={dragBarEnd}
              />
            )}
          </View>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  height: 100%;
`

const View = styled.div<{ hasBar: boolean }>`
  ${({ hasBar }) => css`
    width: 100%;
    padding-right: ${hasBar ? `${BAR_WIDTH}px` : '0'};
    position: relative;
  `}
`

const Bar = styled.div<{ isOnDrag: boolean }>`
  ${({ isOnDrag }) => css`
    position: absolute;
    width: ${BAR_WIDTH}px;
    background: ${isOnDrag ? Color.Gray30 : Color.Gray05};
    cursor: col-resize;
    top: 0;
    right: 0;
    height: 100%;
    color: ${isOnDrag ? Color.Gray00 : Color.Gray60};

    &:hover {
      background: ${Color.Gray30};
      color: ${Color.Gray00};
    }

    &::after {
      content: '•••';
      font-size: 16px;
      transform: rotate(90deg);
      display: block;
      top: 50%;
      left: -3px;
      position: absolute;
    }
  `}
`
