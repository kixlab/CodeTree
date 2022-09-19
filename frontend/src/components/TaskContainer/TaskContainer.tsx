import React from 'react'
import './TaskContainer.scss'

interface Props {
  instruction: JSX.Element
  task: JSX.Element
  footer?: JSX.Element
}

function TaskContainer(props: Props) {
  return (
    <div className="task-container">
      <div className="scrollable-area">
        <div className="instruction">{props.instruction}</div>
        {props.task}
      </div>
      {props.footer}
    </div>
  )
}

export default TaskContainer
