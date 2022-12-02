import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormatContainer from '../components/FormatContainer/FormatContainer'
import { Page } from '../components/Page'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetIdAndGroupParams, GetIdAndGroupResults } from '../protocol/GetIdAndGroup'
import {
  GetParticipationAvailabilityParams,
  GetParticipationAvailabilityResults,
} from '../protocol/GetParticipationAvailability'
import { Color } from '../shared/Common'
import { initialize, nextStage } from '../shared/ExperimentHelper'
import { Get } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { SCENARIO } from '../shared/Scenario'

export function Instruction() {
  const [canParticipate, setCanParticipate] = React.useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    Get<GetParticipationAvailabilityParams, GetParticipationAvailabilityResults>(
      `${SERVER_ADDRESS}/getParticipationAvailability`,
      {}
    ).then(({ availabiltiy }) => {
      setCanParticipate(availabiltiy)
    })
  })

  const onStart = useCallback(async () => {
    try {
      const { id, group } = await Get<GetIdAndGroupParams, GetIdAndGroupResults>(`${SERVER_ADDRESS}/getIdAndGroup`, {})
      initialize(id, group)
      navigate(nextStage())
    } catch (e) {
      window.alert(
        `데이터를 불러오는 데에 실패하였습니다. 작업하신 내용을 있다면 저장하시고, 페이지를 새로 고침해주세요. ${e}`
      )
    }
  }, [navigate])

  return (
    <Page>
      <FormatContainer>
        <h1>프로그래밍 학습 실험 참여</h1>
        <p>
          <b>대상:</b>
          <span> while문까지 학습한 프로그래밍 초보자</span>
          <br />
          <b>요건:</b>
          <span> 만 18세 이상</span>
          <br />
          <b>시간:</b>
          <span> 약 1시간 ~ 1시간 30분</span>
          <br />
          <b>보상:</b>
          <span> 2만원</span>
          <br />
          <b>주관:</b>
          <span> 카이스트 인터랙션 연구실</span>
        </p>
        <p>
          실험에 참여해주셔서 감사합니다. 실험 시작 전, 간단하게 연구 배경과 실험 과정, 그리고 유의 사항에 대해
          안내드리겠습니다.
        </p>
        <h2>{getString('instruction_background')}</h2>
        <p>
          학습자들은 문제 풀이 과정의 각 단계들이 어떤 역할과 목적을 가지고 사용되었는지 스스로 설명하는 과정을 통해
          문제 풀이에 대한 이해를 높일 수 있습니다. 저희는 이러한 과정을 도와 학습자들이 풀이과정을 더 잘 이해하도록
          돕는 시스템을 목표로 하고 있습니다. 이번 실험에서는 학습자들이 문제 풀이 과정을 스스로 공부하는 것이 학습에
          얼마나 도움이 되는지 확인해보고자 합니다.
        </p>
        <h2>{getString('instruction_procedure')}</h2>
        <p>
          본 실험은 여러 단계로 나뉘어져 있습니다 (아래 표 참고). 실험의 원활한 진행을 위해 각 단계마다 제한시간을 두고
          있으며, 제한시간이 지나면 다음 단계로 넘어가야 합니다. 시스템 상단에 남은 시간 표시가 되어 있으며, 제한시간이
          지나면 시스템에서 알림을 보냅니다.
        </p>
        <table>
          <thead>
            <tr>
              <td>단계 (분)</td>
              <td>활동</td>
            </tr>
          </thead>
          <tbody>
            {SCENARIO.map(({ name, timeLimit }, i) => {
              const time = timeLimit / 60
              return (
                <tr key={name}>
                  <td>{`${i + 1} (${time === 0 ? '-' : time})`}</td>
                  <td>{name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Footer>
          <ParticipateButton type="button" onClick={onStart} disabled={!canParticipate}>
            실험 참여
          </ParticipateButton>
        </Footer>
      </FormatContainer>
    </Page>
  )
}

const ParticipateButton = styled.button`
  background: ${Color.Blue};
  color: ${Color.Gray00};
  border: none;
  border-radius: 4px;
  padding: 10px;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  width: 100%;

  &:hover {
    background: ${Color.Blue20};
  }

  &:disabled {
    background: ${Color.Gray30};
    cursor: not-allowed;
  }
`

const Footer = styled.div`
  margin-top: 20px;
  padding-bottom: 40px;
`
