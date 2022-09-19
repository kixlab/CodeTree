import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Color } from '../shared/Common'

interface Props {
  checked: boolean
  onChange?: (checked: boolean) => void
}

const Container = styled.button<{ checked: boolean }>`
  ${({ checked }) => css`
    width: 21px;
    height: 21px;
    border: 1px solid ${Color.Gray30};
    margin: 4px;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    background: ${Color.Gray00};

    ${checked &&
    css`
      position: relative;

      &:after {
        content: '';
        left: 6px;
        top: 1px;
        width: 6px;
        height: 10px;
        border: solid ${Color.Orange};
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        display: block;
        position: absolute;
      }
    `}
  `}
`

export function CheckBox({ checked, onChange }: Props) {
  return <Container type="button" checked={checked} onClick={() => onChange?.(!checked)} />
}

export default CheckBox
