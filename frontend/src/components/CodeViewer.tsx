import { cpp } from '@codemirror/lang-cpp'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import CM from '@uiw/react-codemirror'
import React, { useMemo } from 'react'
import { Color } from '../shared/Common'
import { CODE_LINE_HEIGHT } from '../shared/Constants'

interface Props {
  code: string
  lineHeight?: number
  mode?: 'python' | 'javascript' | 'cpp'
}

function Component({ code, lineHeight = CODE_LINE_HEIGHT - 8, mode = 'python' }: Props) {
  const extensions = useMemo(() => {
    if (mode === 'python') {
      return [python()]
    }
    if (mode === 'javascript') {
      return [javascript()]
    }
    return [cpp()]
  }, [mode])

  return (
    <Container lineHeight={lineHeight}>
      <CM
        autoFocus
        value={code}
        extensions={[...extensions]}
        indentWithTab
        readOnly
        basicSetup={{ lineNumbers: false }}
      />
    </Container>
  )
}

export const CodeViewer = React.memo(Component)

const Container = styled.div<{ lineHeight: number }>`
  ${({ lineHeight }) => css`
    color: ${Color.Gray85};

    & > div {
      height: 100%;
      font-size: ${lineHeight - 2}px;

      .cm-editor {
        height: 100%;
        outline: none !important;
      }
    }

    div {
      background-color: transparent !important;
      border: none !important;
      line-height: ${lineHeight}px;
    }
  `}
`
