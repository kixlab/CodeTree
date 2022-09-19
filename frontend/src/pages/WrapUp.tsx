import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import FormatContainer from '../components/FormatContainer/FormatContainer'
import { getString } from '../shared/Localization'
import { PostParticipantFinishedParams, PostParticipantFinishedResult } from '../protocol/PostParticipantFinished'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { getGroup, getId } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'

interface MatchParams {}

interface State {}

class WrapUp extends React.Component<RouteComponentProps<MatchParams>, State> {
  componentDidMount() {
    const id = getId()
    const group = getGroup()
    if (id && group) {
      Post<PostParticipantFinishedParams, PostParticipantFinishedResult>(
        `${SERVER_ADDRESS}/postParticipantFinished`,
        {
          participantId: id,
          group,
        },
        () => {},
        error => window.alert(error.message)
      )
    }
  }

  render() {
    return (
      <div>
        <Header />
        <FormatContainer>
          <h1>{getString('wrapup_title')}</h1>
          <p>{getString('wrapup_document_submission_instruction')}</p>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1jYcOou4MCjYGuIDNzxdoaikv9QsJmVWh/view?usp=sharing"
              >
                {getString('wrapup_informed_consent')}
              </a>
              {getString('wrapup_send_signiture')}
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1V8AuTlybWFlYNemCTMKvdJu3dkqw-66K/view?usp=sharing"
              >
                {getString('wrapup_account')}
              </a>
              {getString('wrapup_send_account')}
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1AvaaieBhMNBLBcr37iHT8aR432NiZnBh/view?usp=sharing"
              >
                {getString('wrapup_privacy_consent')}
              </a>
              {getString('wrapup_send_privacy')}
            </li>
          </ul>
          <p>{getString('wrapup_further_question')}</p>
          <ul>
            <li>jinhw@kaist.ac.kr</li>
          </ul>
        </FormatContainer>
      </div>
    )
  }
}

export default WrapUp
