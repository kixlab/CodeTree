import React, { useMemo } from 'react'
import CM from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import styled from '@emotion/styled'

interface Props {
  code: string
  mode?: 'python' | 'javascript' | 'cpp'
}

export function CodeMirror({ code, mode = 'python' }: Props) {
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
    <Container>
      <CM autoFocus value={code} extensions={[...extensions]} indentWithTab readOnly />
    </Container>
  )
}

const Container = styled.div`
  & > div {
    height: 100%;
    font-size: 22px;

    .cm-editor {
      height: 100%;
    }
  }
`
