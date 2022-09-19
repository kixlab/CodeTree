import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Color } from '../shared/Common'

interface Props {
  checked: boolean
}

const Container = styled.div<{ checked: boolean }>`
  ${({ checked }) => css`
    width: 21px;
    height: 21px;
    border: 1px solid ${Color.Gray30};
    margin: 2px;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    background-color: ${Color.Gray00};
    flex-shrink: 0;

    ${checked &&
    css`
      position: relative;
      background: ${Color.Orange};
      border-color: ${Color.Orange};

      &:after {
        content: '';
        left: 7px;
        top: 2px;
        width: 6px;
        height: 10px;
        border: solid ${Color.Gray00};
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        display: block;
        position: absolute;
      }
    }
    `}
  `}
`

function Radio({ checked }: Props) {
  return <Container checked={checked} />
}

export default Radio
