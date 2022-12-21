import React from 'react'
import { useEffectOnce } from 'react-use'
import { FormatContainer } from '../components/FormatContainer'
import { Page } from '../components/Page'
import { Title } from '../components/Title'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useExperiment } from '../hooks/useExperiment'
import { PostParticipantFinishedParams, PostParticipantFinishedResult } from '../protocol/PostParticipantFinished'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'

export function WrapUp() {
  const { id, group } = useExperiment()

  useEffectOnce(() => {
    if (group) {
      Post<PostParticipantFinishedParams, PostParticipantFinishedResult>(`${SERVER_ADDRESS}/postParticipantFinished`, {
        participantId: id,
        group,
      })
    }
  })

  return (
    <Page>
      <FormatContainer>
        <Title>{getString('wrapup_title')}</Title>
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
    </Page>
  )
}
