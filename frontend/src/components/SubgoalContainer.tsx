import React from 'react'
import styled from '@emotion/styled'
import { SubgoalLabel } from './SubgoalLabel'
import { getString } from '../shared/Localization'
import { Color } from '../shared/Common'
import { SubgoalNode } from '../types/subgoalNode'
import { PostSuggestionBySubgoalsResults } from '../protocol/PostSuggestionBySubgoals'

interface Props {
  subgoals: SubgoalNode[]
  selectedSubgoal: number | null
  canAddSubgoals?: boolean
  suggestions?: PostSuggestionBySubgoalsResults['subgoalsWithSuggestion']
  addSubgoal?: (id: number | null) => void
  removeSubgoal?: (id: number) => void
  selectSubgoal?: (id: number) => void
  editSubgoal?: (id: number, label: string) => void
}

export function SubgoalContainer({
  addSubgoal,
  canAddSubgoals = true,
  selectedSubgoal,
  removeSubgoal,
  selectSubgoal,
  editSubgoal,
  subgoals,
  suggestions,
}: Props) {
  return (
    <Container>
      {subgoals.map((subgoal, i) => {
        const distFromParentNode = subgoal.parentId != null ? i - subgoals.findIndex(s => s.id === subgoal.parentId) : 0

        return (
          <SubgoalLabel
            key={subgoal.id}
            subgoal={subgoal}
            addSubgoal={addSubgoal}
            selected={subgoal.id === selectedSubgoal}
            distFromParentNode={distFromParentNode}
            selectSubgoal={selectSubgoal}
            removeSubgoal={removeSubgoal}
            editSubgoal={editSubgoal && ((label: string) => editSubgoal?.(subgoal.id, label))}
            suggestion={suggestions?.[i]?.suggestions}
          />
        )
      })}
      {canAddSubgoals && addSubgoal != null && (
        <AddButton type="button" onClick={() => addSubgoal?.(null)}>
          <PlaceholderInput>{getString('label_placeholder')}</PlaceholderInput>
          <PlaceholderAddSubgoal>{getString('label_add_subgoal')}</PlaceholderAddSubgoal>
        </AddButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 8px;
`

const AddButton = styled.button`
  padding: 10px;
  border: 2px solid ${Color.Gray15};
  background-color: ${Color.Gray00};
  cursor: pointer;
  margin-bottom: 40px;
  user-select: none;
  outline: none;
  width: 100%;
  position: relative;
  text-align: left;

  &::after {
    content: '${getString('subgoal_container')}';
    color: ${Color.Blue};
    font-size: 18px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`

const PlaceholderInput = styled.div`
  width: calc(100% - 35px);
  padding: 2px;
  font-size: 16px;
  border-bottom: 1px solid ${Color.Gray20};
  color: ${Color.Gray30};
`

const PlaceholderAddSubgoal = styled.div`
  color: ${Color.Gray20};
  padding: 4px 12px;
`
