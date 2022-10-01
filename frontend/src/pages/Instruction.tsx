import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import FormatContainer from '../components/FormatContainer/FormatContainer'
import Header from '../components/Header/Header'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetIdAndGroupParams, GetIdAndGroupResults } from '../protocol/GetIdAndGroup'
import {
  GetParticipationAvailabilityParams,
  GetParticipationAvailabilityResults,
} from '../protocol/GetParticipationAvailability'
import { initialize, nextStage, shouldMoveStage } from '../shared/ExperimentHelper'
import { Get, Get2 } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'

interface MatchParams {}

interface State {
  isReceivingInfo: boolean
  canParticipate: boolean
}

class Instruction extends React.Component<RouteComponentProps<MatchParams>, State> {
  constructor(props: RouteComponentProps<MatchParams>) {
    super(props)
    this.state = {
      isReceivingInfo: true,
      canParticipate: true,
    }
  }

  componentDidMount() {
    document.title = `Instruction - CodeTree`
    if (shouldMoveStage()) {
      this.props.history.push(nextStage())
    }

    Get<GetParticipationAvailabilityParams, GetParticipationAvailabilityResults>(
      `${SERVER_ADDRESS}/getParticipationAvailability`,
      {},
      res => {
        if (res.availabiltiy) {
          this.setState({
            isReceivingInfo: false,
            canParticipate: true,
          })
        } else {
          this.setState({
            canParticipate: false,
          })
        }
      },
      error => window.alert(error.message)
    )
  }

  onStart = async () => {
    this.setState({
      isReceivingInfo: true,
    })
    try {
      const res = await Get2<GetIdAndGroupParams, GetIdAndGroupResults>(`${SERVER_ADDRESS}/getIdAndGroup`, {})
      initialize(res.id, res.group)
      this.props.history.push(nextStage())
    } catch (e) {
      window.alert(
        `데이터를 불러오는 데에 실패하였습니다. 작업하신 내용을 있다면 저장하시고, 페이지를 새로 고침해주세요. ${e}`
      )
      this.setState({
        isReceivingInfo: false,
      })
    }
  }

  render() {
    return (
      <div>
        <Header />
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
            본 실험은 여러 단계로 나뉘어져 있습니다 (아래 표 참고). 실험의 원활한 진행을 위해 각 단계마다 제한시간을
            두고 있으며, 제한시간이 지나면 다음 단계로 넘어가야 합니다. 시스템 상단에 남은 시간 표시가 되어 있으며,
            제한시간이 지나면 시스템에서 알림을 보냅니다.
          </p>
          <table>
            <thead>
              <tr>
                <td>단계 (분)</td>
                <td>활동</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 (5)</td>
                <td>{getString('progress_bar_stage_instruction')}</td>
              </tr>
              <tr>
                <td>2 (3)</td>
                <td>{getString('progress_bar_stage_consent')}</td>
              </tr>
              <tr>
                <td>3 (3)</td>
                <td>{getString('progress_bar_stage_demographic')}</td>
              </tr>
              <tr>
                <td>4 (5)</td>
                <td>{getString('progress_bar_stage_pretest')}</td>
              </tr>
              <tr>
                <td>5 (10)</td>
                <td>{getString('progress_bar_stage_training')}</td>
              </tr>
              <tr>
                <td>6 (30)</td>
                <td>
                  {`${getString('progress_bar_stage_worked_example')} & ${getString('progress_bar_stage_practice')}`}
                </td>
              </tr>
              <tr>
                <td>7 (3)</td>
                <td>{getString('progress_bar_stage_cognitive')}</td>
              </tr>
              <tr>
                <td>8 (25)</td>
                <td>{getString('progress_bar_stage_assessment')}</td>
              </tr>
              <tr>
                <td>9 (5)</td>
                <td>{getString('progress_bar_stage_posttest')}</td>
              </tr>
            </tbody>
          </table>
          <p>또한, 실험 진행 중 현재 실험 단계나 앞으로의 단계를 상단 진행바에 마우스를 갖다대어 확인할 수 있습니다.</p>
          <img src="./assets/progress_bar.png" alt="The progress bar at the top header." />
          <h2>{getString('instruction_notes')}</h2>
          <h3>Python 프로그래밍</h3>
          <p>
            실험에서 제공되는 예시 코드, 사전/사후 평가 문제들은 Python 문법으로 작성되어 있으며, 연습 문제와 평가
            문제에서 코드를 작성하실 때에는 Python을 사용해주시길 바랍니다.
            <br />
            <strong>
              <span>Python에 익숙치 않으시다면, 실험 시작 전 </span>
              <a href="/python-tutorial" target="_blank" rel="noopener noreferrer">
                튜토리얼
              </a>
              <span>을 꼭 먼저 확인하세요.</span>
            </strong>
            <br />
            튜토리얼은 실험 중에도 상단 영역의 &quot;Python 튜토리얼 보기&quot; 버튼을 눌러 확인하실 수 있습니다.
          </p>
          <button
            type="button"
            onClick={this.onStart}
            disabled={this.state.isReceivingInfo || !this.state.canParticipate}
          >
            실험 참여
          </button>
        </FormatContainer>
      </div>
    )
  }
}

export default Instruction
