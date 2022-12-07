import { cpp } from '@codemirror/lang-cpp'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import styled from '@emotion/styled'
import CodeMirror from '@uiw/react-codemirror'
import React, { useMemo } from 'react'
import { CodeType } from '../protocol/Common'
import { Color } from '../shared/Common'

interface Props {
  code: string
  editorKey?: string
  mode?: CodeType
  onCodeChange: (code: string) => void
}

export function CodeEditor({ code, editorKey, mode = 'python', onCodeChange }: Props) {
  const extensions = useMemo(() => {
    if (mode === 'python') {
      return [python()]
    }
    if (mode === 'javascript') {
      return [javascript()]
    }
    if (mode === 'cpp') {
      return [cpp()]
    }
    return [cpp()]
  }, [mode])

  return (
    <Container>
      <CodeMirror
        key={editorKey}
        autoFocus
        value={code}
        extensions={[...extensions]}
        onChange={onCodeChange}
        tabIndex={-4}
        indentWithTab
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: calc(100% - 1px);
  height: 100%;
  overflow-y: scroll;
  display: inline-block;
  vertical-align: top;
  color: ${Color.Gray85};

  & > div {
    height: 100%;
    font-size: 22px;

    .cm-editor {
      height: 100%;
    }
  }
`
