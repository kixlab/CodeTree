import React, { useCallback } from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

export function PostTest() {
  const participantID = getId()

  const onTimeOut = useCallback(() => {
    window.alert(getString('posttest_alert_time_up'))
  }, [])

  return (
    <Page onTimeOut={onTimeOut}>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScphvy2-8EhzZYiscZqhpD1V57K5bHktAViG_CfYAv7nWvbZQ/viewform?usp=pp_url&entry.1709447=${participantID}`}
      />
    </Page>
  )
}
