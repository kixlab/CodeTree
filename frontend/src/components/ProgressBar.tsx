import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { getString } from '../shared/Localization'
import { Color } from '../shared/Common'

interface Props {
  currentIndex: number
  stageList: string[]
}

enum StageStatus {
  Finished,
  OnGoing,
  NotStarted,
}

export function ProgressBar(props: Props) {
  return (
    <Container data-prefix={getString('progress_bar_prefix')}>
      {props.stageList.map((stageName, index) => {
        if (index < props.currentIndex) {
          return <Stage status={StageStatus.Finished} key={index} data-tool-tip={stageName} />
        }
        if (index === props.currentIndex) {
          return <Stage status={StageStatus.OnGoing} key={index} data-tool-tip={stageName} />
        }
        return <Stage status={StageStatus.NotStarted} key={index} data-tool-tip={stageName} />
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  height: 24px;
  justify-content: space-around;
  border: 1px solid ${Color.Green00};
  margin-right: 15px;
  margin-left: 90px;

  &:before {
    position: absolute;
    right: calc(100% + 5px);
    font-size: 18px;
    content: attr(data-prefix);
    white-space: nowrap;
  }
`

const Stage = styled.div<{ status: StageStatus }>`
  ${({ status }) => css`
    background: ${status === StageStatus.NotStarted
      ? Color.Gray00
      : status === StageStatus.Finished
      ? Color.Green00
      : Color.Blue};
    flex: 1;
    position: relative;
    border-right: 1px solid ${status === StageStatus.Finished ? Color.Green20 : Color.Green00};

    &:last-child {
      border-right: none;
    }

    &:hover {
      background: ${status === StageStatus.NotStarted
        ? Color.Gray05
        : status === StageStatus.Finished
        ? Color.Green20
        : Color.Blue20};

      &:after {
        content: attr(data-tool-tip);
        position: absolute;
        width: auto;
        padding: 5px;
        top: 100%;
        left: 0;
        background-color: ${Color.Gray75};
        color: ${Color.Gray00};
        font-size: 12px;
        white-space: nowrap;
        z-index: 10;
      }
    }
  `}
`
