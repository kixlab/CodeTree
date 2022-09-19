import CodeMirror from 'react-codemirror'
import './CodeEditor.scss'
import React from 'react'

require('codemirror/lib/codemirror.css')
require('codemirror/mode/python/python')

interface Props {
  code: string
  editorKey?: string
  onCodeChange: (code: string) => void
}

class CodeEditor extends React.Component<Props> {
  options = {
    lineNumbers: true,
    mode: 'python',
    theme: 'default',
    readOnly: false,
    spellcheck: true,
    indentUnit: 4,
    indentWithTabs: true,
    autocorrect: true,
  }

  render() {
    return (
      <div className="CodeEditor">
        <CodeMirror
          key={this.props.editorKey}
          autoFocus
          value={this.props.code}
          options={this.options}
          onChange={code => this.props.onCodeChange(code)}
        />
      </div>
    )
  }
}

export default CodeEditor
