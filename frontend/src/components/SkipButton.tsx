import styled from '@emotion/styled'
import React from 'react'
import { Color } from '../shared/Common'

interface Props {
  onClick: () => void
  children: React.ReactNode
}

export function SkipButton({ onClick, children }: Props) {
  return <Button onClick={onClick}>{children}</Button>
}

const Button = styled.button`
  background: ${Color.Error00};
  color: ${Color.Gray00};
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  z-index: 100;
  border: none;

  &:hover {
    background: ${Color.Error20};
  }
`
