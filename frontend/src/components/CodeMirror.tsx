import { cpp } from '@codemirror/lang-cpp'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import CM from '@uiw/react-codemirror'
import React, { useMemo } from 'react'
import { CODE_LINE_HEIGHT } from '../shared/Constants'

interface Props {
  code: string
  fontSize?: number
  mode?: 'python' | 'javascript' | 'cpp'
}

function Component({ code, fontSize = CODE_LINE_HEIGHT - 8, mode = 'python' }: Props) {
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
    <Container fontSize={fontSize}>
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

export const CodeMirror = React.memo(Component)

const Container = styled.div<{ fontSize: number }>`
  ${({ fontSize }) => css`
    & > div {
      height: 100%;
      font-size: ${fontSize}px;

      .cm-editor {
        height: 100%;
      }
    }

    div {
      background-color: transparent !important;
      border: none !important;
    }
  `}
`
