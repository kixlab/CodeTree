import React, { useCallback } from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

export function PreTest() {
  const participantID = getId()

  const onTimeOut = useCallback(() => {
    window.alert(getString('pretest_alert_time_up'))
  }, [])

  return (
    <Page onTimeOut={onTimeOut}>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScDPCD1sDy1lPbV5vDWsLfRc6ycIrlsiKxxax9eqn9R5eUQIw/viewform?usp=pp_url&entry.1709447=${participantID}`}
      />
    </Page>
  )
}
