import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { FormatContainer } from '../components/FormatContainer'
import { Page } from '../components/Page'
import { SubTitle } from '../components/SubTitle'
import { Title } from '../components/Title'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useExperiment } from '../hooks/useExperiment'
import {
  GetParticipationAvailabilityParams,
  GetParticipationAvailabilityResults,
} from '../protocol/GetParticipationAvailability'
import { Get } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { SCENARIO } from '../shared/Scenario'

export function Instruction() {
  const [canParticipate, setCanParticipate] = React.useState(false)
  const navigate = useNavigate()
  const { initialize, nextStage } = useExperiment()

  useEffect(() => {
    Get<GetParticipationAvailabilityParams, GetParticipationAvailabilityResults>(
      `${SERVER_ADDRESS}/getParticipationAvailability`,
      {}
    ).then(res => {
      if (res) {
        setCanParticipate(res.availabiltiy)
      }
    })
  }, [])

  const onStart = useCallback(async () => {
    await initialize()
    navigate(await nextStage())
  }, [initialize, navigate, nextStage])

  return (
    <Page>
      <FormatContainer>
        <Title>프로그래밍 학습 실험 참여</Title>
        <p>
          <b>대상: </b>
          <span>
            LeetCode나 Baeckjoon과 같은 알고리즘 풀이 사이트에서 Medium ~ Hard 문제를 푸는 데에 아직 어려움이 있거나,
            알고리즘 관련 수업을 학교나 학원을 통해 수강 중인 초보자
          </span>
          <br />
          <b>요건: </b>
          <span>만 18세 이상</span>
          <br />
          <b>시간: </b>
          <span>약 1시간</span>
          <br />
          <b>보상: </b>
          <span>2만원</span>
          <br />
          <b>주관: </b>
          <span>카이스트 인터랙션 연구실</span>
        </p>
        <p>
          실험에 참여해주셔서 감사합니다. 실험 시작 전, 간단하게 연구 배경과 실험 과정, 그리고 유의 사항에 대해
          안내드리겠습니다.
        </p>
        <SubTitle>{getString('instruction_background')}</SubTitle>
        <p>
          프로그래밍에 대한 관심과 활용도가 높아지면서 알고리즘 코딩 교육에 대한 니즈도 늘어나는 추세입니다. 하지만,
          알고리즘 코딩 교육에서 통용되는 알고리즘 문제 풀이법은 없는 상태입니다. 많은 학습자이 알고리즘 문제를 풀 때,
          여러 알고리즘을 정해진 규칙없이 대입해보거나 이전 풀이 경험에서 쌓은 감으로 문제를 푸는 경우가 많습니다.
          하지만 이러한 방식은 알고리즘 문제 풀이 능력을 올리기에 많은 노력이 들 뿐더러 알고리즘 교육의 핵심 목표인
          문제를 작은 단위로 나누고 각각의 문제를 효율적으로 해결해보는 능력을 키우기 힘든 구조입니다.
        </p>
        <p>
          저희는 기존 프로그래밍 교육에서 많이 사용되었던 하위 목표라는 개념을 이용해 교육적으로 더 효과적인 알고리즘
          풀이법을 찾고 이를 도울 수 있는 시스템을 만드려합니다. 하위 목표란, 프로그램, 수학 문제 풀이, 또는 요리법과
          같이 절차가 있는 과정에 계층적으로 존재하는 목표 구조를 의미합니다. 저희는 하위 목표가 알고리즘 문제 풀이에서
          문제를 작게 나누기에 적합한 단위이고, 학습자들이 하위 목표를 정의하고 자신의 풀이를 수정하는 일련의 구조화된
          과정을 통해 보다 쉽게 문제에 접근하고, 알고리즘 교육의 핵심 가치를 배울 수 있다고 생각합니다.
        </p>
        <p>
          저희는 학습자가 하위 목표 기반으로 알고리즘 문제를 풀어 볼 수 있는 웹기반의 시스템을 만들어, 학습자들이
          시스템을 사용하지 않았을 때와 비교해 학습 경험과 점수 향상이 있는 지를 실험을 통해 보고자 합니다.
        </p>
        <SubTitle>{getString('instruction_procedure')}</SubTitle>
        <p>
          본 실험은 여러 단계로 나뉘어져 있습니다 (아래 표 참고). 실험의 원활한 진행을 위해 각 단계마다 제한시간을 두고
          있으며, 제한시간이 지나면 다음 단계로 넘어가야 합니다. 시스템 상단에 남은 시간 표시가 되어 있으며, 제한시간이
          지나면 시스템에서 알림을 보냅니다.
        </p>
        <table>
          <thead>
            <tr>
              <Cell>단계 (분)</Cell>
              <Cell>활동</Cell>
            </tr>
          </thead>
          <tbody>
            {SCENARIO.map(({ name, timeLimit }, i) => {
              const time = timeLimit / 60
              return (
                <tr key={name}>
                  <Cell>{`${i + 1} (${time === 0 ? '-' : time})`}</Cell>
                  <Cell>{name}</Cell>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Footer>
          <ActionButton onClick={onStart} disabled={!canParticipate}>
            실험 참여
          </ActionButton>
        </Footer>
      </FormatContainer>
    </Page>
  )
}

const Footer = styled.div`
  margin-top: 20px;
  padding-bottom: 40px;
`

const Cell = styled.td`
  padding: 4px 8px;
`
