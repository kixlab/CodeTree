import React from 'react'
import { Link } from 'react-router-dom'
import FormatContainer from '../components/FormatContainer/FormatContainer'
import Header from '../components/Header/Header'
import { getGroup, getId, nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

export default function Contact() {
  return (
    <div>
      <Header />
      <FormatContainer>
        <h1>{getString('contact_title')}</h1>
        {!getId() && (
          <div>
            <h3>
              <b>{getString('contact_missing_id')}</b>
            </h3>
            <div>
              {getString('contact_missing_id_solution')}
              <ul>
                <li>jinhw@kaist.ac.kr</li>
              </ul>
            </div>
          </div>
        )}
        {!getGroup() && (
          <div>
            <h3>
              <b>{getString('contact_missing_group')}</b>
            </h3>
            <div>
              {getString('contact_missing_group_solution')}
              <ul>
                <li>jinhw@kaist.ac.kr</li>
              </ul>
            </div>
          </div>
        )}
        {getId() && getGroup() && (
          <div>
            <h3>
              <b>{getString('contact_wrong_url')}</b>
            </h3>
            <p>
              {getString('contact_wrong_url_solution')}
              <Link to={nextStage()}>{getString('contact_wrong_url_link')}</Link>
            </p>
          </div>
        )}
      </FormatContainer>
    </div>
  )
}
