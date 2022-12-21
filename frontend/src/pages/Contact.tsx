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
          <>
            <SubTitle>{getString('contact_missing_id')}</SubTitle>
            <p>{getString('contact_missing_id_solution')}</p>
          </>
        )}
        {!group && (
          <>
            <SubTitle>{getString('contact_missing_group')}</SubTitle>
            <p>{getString('contact_missing_group_solution')}</p>
          </>
        )}
        {id && group && (
          <>
            <SubTitle>{getString('contact_wrong_url')}</SubTitle>
            <p>{getString('contact_wrong_url_solution')}</p>
            <ActionButton onClick={next}>{getString('contact_wrong_url_link')}</ActionButton>
          </>
        )}
      </FormatContainer>
    </Page>
  )
}
