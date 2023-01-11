import { css } from '@emotion/react'

export const CommonCss = css`
  li {
    &::before {
      content: '•';
    }
  }

  body {
    font-size: 18px;
    line-height: initial;
  }

  p {
    margin-bottom: 12px;
  }

  b {
    font-weight: bold;
  }
`
