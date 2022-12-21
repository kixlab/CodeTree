import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { FormatContainer } from '../components/FormatContainer'
import { Page } from '../components/Page'
import { SubTitle } from '../components/SubTitle'
import { Title } from '../components/Title'
import { useExperiment } from '../hooks/useExperiment'
import { getString } from '../shared/Localization'

export default function Contact() {
  const { id, group, nextStage } = useExperiment()
  const navigate = useNavigate()

  const next = useCallback(async () => {
    navigate(await nextStage())
  }, [navigate, nextStage])

  return (
    <Page>
      <FormatContainer>
        <Title>{getString('contact_title')}</Title>
        {id && (
          <p>
            <SubTitle>{getString('contact_missing_id')}</SubTitle>
            {getString('contact_missing_id_solution')}
            <ul>
              <li>jinhw@kaist.ac.kr</li>
            </ul>
          </p>
        )}
        {!group && (
          <p>
            <SubTitle>{getString('contact_missing_group')}</SubTitle>
            {getString('contact_missing_group_solution')}
            <ul>
              <li>jinhw@kaist.ac.kr</li>
            </ul>
          </p>
        )}
        {id && group && (
          <p>
            <SubTitle>{getString('contact_wrong_url')}</SubTitle>
            {getString('contact_wrong_url_solution')}
            <ActionButton onClick={next}>{getString('contact_wrong_url_link')}</ActionButton>
          </p>
        )}
      </FormatContainer>
    </Page>
  )
}
