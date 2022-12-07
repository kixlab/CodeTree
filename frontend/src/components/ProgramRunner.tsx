import React, { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { getString } from '../shared/Localization'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'
import { CodeType } from '../protocol/Common'

interface Props {
  onClickRun: () => void
  onJudging: () => void
  onChangeMode?: (mode: CodeType) => void
  isRunning: boolean
  mode?: CodeType
}

export function ProgramRunner({ mode = 'python', onClickRun, onJudging, isRunning, onChangeMode }: Props) {
  const onClickLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as CodeType
    onChangeMode?.(language)
  }

  return (
    <Container>
      <SelectLanguage>언어 선택:</SelectLanguage>
      <Select onChange={onClickLanguage} defaultValue={mode}>
        {['javascript', 'python', 'cpp'].map(language => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </Select>
      <RunButton type="button" onClick={onClickRun} disabled={isRunning}>
        {getString('practice_run')}
      </RunButton>
      <JudgeButton type="button" onClick={onJudging} disabled={isRunning}>
        {getString('practice_submit')}
      </JudgeButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${Color.Gray15};
  padding: 4px;
  background: ${Color.Gray05};
  align-items: center;
`

const ButtonStyle = css`
  height: ${SUBMIT_BUTTON_HEIGHT}px;
  outline: none;
  font-weight: bold;
  border: none;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
  color: ${Color.Gray00};
  border-radius: 4px;
  min-width: 100px;
  margin-left: 4px;
`

const RunButton = styled.button`
  ${ButtonStyle};
  background: ${Color.Gray75};
  border-right: 1px solid ${Color.Gray30};

  &:hover {
    background: ${Color.Gray60};
  }

  &:disabled {
    background: ${Color.Gray30};
    cursor: not-allowed;
  }
`

const JudgeButton = styled.button`
  ${ButtonStyle};
  background: ${Color.Green20};
  border-right: 1px solid ${Color.Gray30};

  &:hover {
    background: ${Color.Green40};
  }

  &:disabled {
    background: ${Color.Gray30};
    cursor: not-allowed;
  }
`

const Select = styled.select`
  height: ${SUBMIT_BUTTON_HEIGHT}px;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
`

const SelectLanguage = styled.span`
  margin-right: 8px;
  font-size: 18px;
  color: ${Color.Gray85};
`
