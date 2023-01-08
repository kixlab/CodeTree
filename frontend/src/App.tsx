import { Global } from '@emotion/react'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Router'
import { CommonCss } from './shared/CommonCss'
import { ResetCSS } from './shared/ResetCss'

function App() {
  return (
    <React.StrictMode>
      <Global styles={ResetCSS} />
      <Global styles={CommonCss} />
      <RouterProvider router={Router} />
    </React.StrictMode>
  )
}

export default App
