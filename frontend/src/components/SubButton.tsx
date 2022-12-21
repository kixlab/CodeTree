import styled from '@emotion/styled'
import React from 'react'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'

interface Props {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

export function SubButton({ onClick, children, disabled = false }: Props) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  )
}

const Button = styled.button`
  width: 100%;
  height: ${SUBMIT_BUTTON_HEIGHT}px;
  background: ${Color.Gray05};
  border: none;
  color: ${Color.Gray75};
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: ${Color.Gray15};
  }

  &:disabled {
    background: ${Color.Gray05};
    color: ${Color.Gray00};
    cursor: not-allowed;
  }
`
