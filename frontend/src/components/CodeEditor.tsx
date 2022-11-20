import { cpp } from '@codemirror/lang-cpp'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import styled from '@emotion/styled'
import CodeMirror from '@uiw/react-codemirror'
import React, { ChangeEvent, useMemo } from 'react'

interface Props {
  code: string
  editorKey?: string
  mode?: 'python' | 'javascript' | 'cpp'
  onCodeChange: (code: string) => void
  onChangeMode?: (mode: 'python' | 'javascript' | 'cpp') => void
}

function CodeEditor({ code, editorKey, mode = 'python', onCodeChange, onChangeMode }: Props) {
  const onClickLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as 'python' | 'javascript' | 'cpp'
    onChangeMode?.(language)
  }

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
      <Select onChange={onClickLanguage} defaultValue={mode}>
        {['javascript', 'python', 'cpp'].map(language => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </Select>
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

  & > div {
    height: 100%;
    font-size: 22px;

    .cm-editor {
      height: 100%;
    }
  }
`

const Select = styled.select`
  height: 25px;
`

export default CodeEditor
