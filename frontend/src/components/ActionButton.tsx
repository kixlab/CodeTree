import styled from '@emotion/styled'
import React from 'react'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'

interface Props {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}

export function ActionButton({ onClick, children, disabled }: Props) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  )
}

const Button = styled.button`
  width: 100%;
  height: ${SUBMIT_BUTTON_HEIGHT}px;
  background: ${Color.Blue};
  border: none;
  color: ${Color.Gray00};
  font-size: 18px;

  &:hover {
    background: ${Color.Blue20};
  }

  &:disabled {
    background: ${Color.Gray30};
    cursor: not-allowed;
  }
`
