import React, { useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'
import { SUBGOAL_STICK_WIDTH } from '../shared/Constants'
import { SubgoalNode } from '../types/subgoalNode'

interface Props {
  selected: boolean
  subgoal: SubgoalNode
  distFromParentNode: number
  suggestion?: string[]
  removeSubgoal?: (id: number) => void
  selectSubgoal?: (id: number) => void
  editSubgoal?: (label: string) => void
  addSubgoal?: (id: number | null) => void
}

export function SubgoalLabel({
  subgoal: { id, label, depth, canAddSubgoal = true, color },
  selected,
  distFromParentNode,
  suggestion = [],
  removeSubgoal,
  selectSubgoal,
  editSubgoal,
  addSubgoal,
}: Props) {
  const inputChangedHandler = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      editSubgoal?.(event.currentTarget.value)
    },
    [editSubgoal]
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const isError = !selected && label.trim().length === 0

  useEffect(() => {
    if (selected) {
      inputRef.current?.focus()
    }
  }, [selected])

  return (
    <Container
      selected={selected}
      depth={depth}
      distFromParentNode={distFromParentNode}
      clickable={!editSubgoal}
      onClick={() => {
        if (!editSubgoal) selectSubgoal?.(id)
      }}
      color={color ?? 'transparent'}
    >
      {editSubgoal ? (
        <Input
          isError={isError}
          defaultValue={label}
          onChange={inputChangedHandler}
          placeholder={getString('label_placeholder')}
          onFocus={() => selectSubgoal?.(id)}
          ref={inputRef}
        />
      ) : (
        <Label>{label}</Label>
      )}
      {removeSubgoal && (
        <Close
          type="button"
          onClick={e => {
            e.stopPropagation()
            removeSubgoal?.(id)
          }}
        >
          ✕
        </Close>
      )}
      {canAddSubgoal && (
        <AddButton type="button" onClick={() => addSubgoal?.(id)} disabled={!addSubgoal}>
          {getString('label_add_subgoal')}
        </AddButton>
      )}
      {suggestion.length > 0 && (
        <ul>
          {suggestion.map(s => (
            <li key={s}>
              <Highlight>{s}</Highlight>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}

const Container = styled.div<{
  selected: boolean
  depth: number
  distFromParentNode: number
  clickable: boolean
  color: string
}>`
  ${({ selected, depth, distFromParentNode, clickable, color }) => css`
    position: relative;
    padding: 10px;
    border: 2px solid ${Color.Gray15};
    margin-bottom: 10px;
    margin-left: ${depth * 40}px;
    background-color: ${Color.Gray00};
    z-index: ${100 - depth};
    cursor: ${clickable ? 'pointer' : 'default'};

    ${selected &&
    css`
      border: 2px solid ${Color.Gray85};
    `}

    ${depth > 0 &&
    css`
      &::before {
        content: '';
        width: 18px;
        height: ${distFromParentNode * 74}px;
        position: absolute;
        left: -22px;
        top: -${distFromParentNode * 74 - 35}px;
        border-left: 2px solid ${Color.Gray30};
        border-bottom: 2px solid ${Color.Gray30};
        z-index: 1;
      }
    `}

    &::after {
      content: '';
      width: ${SUBGOAL_STICK_WIDTH}px;
      height: calc(100% + 4px);
      position: absolute;
      background-color: ${color};
      top: -2px;
      left: -2px;
    }
  `}
`

const Close = styled.button`
  position: absolute;
  color: ${Color.Gray30};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  font-weight: bold;
  top: 10px;
  right: 10px;
  user-select: none;
  font-size: 14px;
  background-color: transparent;

  &:hover {
    color: ${Color.Gray50};
  }
`

const Input = styled.input<{ isError: boolean }>`
  ${({ isError }) => css`
    width: calc(100% - 35px);
    outline: none;
    padding: 2px;
    border: none;
    font-size: 16px;
    border-bottom: 1px solid ${Color.Gray30};

    ${isError &&
    css`
      border-color: ${Color.Error20};
      background: rgba(255, 0, 0, 0.1);
    `}
  `}
`

const Label = styled.div`
  width: calc(100% - 35px);
  padding: 2px;
  border: none;
  font-size: 16px;
`

const AddButton = styled.button<{ disabled: boolean }>`
  ${({ disabled }) =>
    css`
      background-color: transparent;
      color: ${disabled ? Color.Gray30 : Color.Blue};
      border: none;
      padding: 4px 12px;
      cursor: ${disabled ? 'not-allowed' : 'pointer'};

      ${!disabled &&
      css`
        &:hover {
          color: ${Color.Blue30};
        }
      `}
    `}
`

const Highlight = styled.span`
  font-size: 14px;
  position: relative;

  &::before {
    content: '';
    background-color: yellow;
    width: 100%;
    height: 6px;
    display: block;
    position: absolute;
    left: 2px;
    bottom: 4px;
    z-index: -1;
  }
`
