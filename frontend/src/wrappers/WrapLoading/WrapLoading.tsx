import React from 'react'
import './WrapLoading.scss'

interface Props {
  loaded: boolean
  children?: React.ReactNode
}

export function WrapLoading(props: Props) {
  return (
    <div className="wrapLoading">
      {props.children}
      <div className={`loaderContainer${props.loaded ? ' loaded' : ''}`}>
        <div className="loader" />
      </div>
    </div>
  )
}
