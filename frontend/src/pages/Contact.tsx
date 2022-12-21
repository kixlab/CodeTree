import React from 'react'
import { Link } from 'react-router-dom'
import { FormatContainer } from '../components/FormatContainer'
import { Page } from '../components/Page'
import { SubTitle } from '../components/SubTitle'
import { Title } from '../components/Title'
import { getGroup, getId, nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

export default function Contact() {
  return (
    <Page>
      <FormatContainer>
        <Title>{getString('contact_title')}</Title>
        {getId() && (
          <p>
            <SubTitle>{getString('contact_missing_id')}</SubTitle>
            {getString('contact_missing_id_solution')}
            <ul>
              <li>jinhw@kaist.ac.kr</li>
            </ul>
          </p>
        )}
        {!getGroup() && (
          <p>
            <SubTitle>{getString('contact_missing_group')}</SubTitle>
            {getString('contact_missing_group_solution')}
            <ul>
              <li>jinhw@kaist.ac.kr</li>
            </ul>
          </p>
        )}
        {getId() && getGroup() && (
          <p>
            <SubTitle>{getString('contact_wrong_url')}</SubTitle>
            {getString('contact_wrong_url_solution')}
            <Link to={nextStage()}>{getString('contact_wrong_url_link')}</Link>
          </p>
        )}
      </FormatContainer>
    </Page>
  )
}
