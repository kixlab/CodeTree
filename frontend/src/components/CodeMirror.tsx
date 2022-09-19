import React from 'react'
import CM from 'react-codemirror'
import '../styles/custom-codeMirror.scss'

require('codemirror/lib/codemirror.css')
require('codemirror/mode/python/python')

interface Props {
  code: string
}

const CodeMirrorOptions = {
  lineNumbers: false,
  mode: 'python',
  theme: 'default',
  readOnly: true,
}

export function CodeMirror({ code }: Props) {
  return (
    <div className="CodeMirrorWrapper">
      <CM value={code} options={CodeMirrorOptions} />
    </div>
  )
}
