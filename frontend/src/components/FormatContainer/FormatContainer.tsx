import React from 'react'
import './FormatContainer.scss'

interface Props {
  children: React.ReactNode
}

function FormatContainer(props: Props) {
  return <div className="format-container">{props.children}</div>
}

export default FormatContainer
