import React from 'react'
import './ProgressBar.scss'
import { getString } from '../../../shared/Localization'

interface Props {
  currentIndex: number
  stageList: string[]
}

function ProgressBar(props: Props) {
  return (
    <div className="progress-bar" data-prefix={getString('progress_bar_prefix')}>
      {props.stageList.map((stageName, index) => {
        if (index < props.currentIndex) {
          return <div className="stage finished" key={index} data-tool-tip={stageName} />
        }
        if (index === props.currentIndex) {
          return <div className="stage on-going" key={index} data-tool-tip={stageName} />
        }
        return <div className="stage" key={index} data-tool-tip={stageName} />
      })}
    </div>
  )
}

export default ProgressBar
