import styled from '@emotion/styled'
import React from 'react'
import { Color } from '../shared/Common'

interface Props {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${Color.Gray30};
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
  min-width: calc(100% - 55px);
  user-select: initial;
  width: 100%;
  color: inherit;
  font-size: 16px;
  cursor: text;

  &:empty:before {
    content: attr(placeholder);
    color: ${Color.Gray30};
  }

  &:focus {
    border-color: ${Color.Gray75};
  }
`

export function TextInput({ value, placeholder = '', onChange }: Props) {
  return <Input placeholder={placeholder} type="text" value={value} onChange={e => onChange(e.target.value ?? '')} />
}
