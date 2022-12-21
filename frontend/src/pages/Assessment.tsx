import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CodeEditor } from '../components/CodeEditor'
import { InstructionContainer } from '../components/InstructionContainer'
import { Page } from '../components/Page'
import { ProblemContainer } from '../components/ProblemContainer'
import { SplitView } from '../components/SplitView'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useExperiment } from '../hooks/useExperiment'
import { useProblem } from '../hooks/useProblem'
import { PostAssessmentCodeParams, PostAssessmentCodeResults } from '../protocol/PostAssessmentCode'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { getProblemNumber } from '../shared/Utils'

type MatchParams = {
  lecture: string
  fileName: string
}

export function Assessment() {
  const { lecture, fileName } = useParams<MatchParams>()
  const problem = useProblem(lecture, fileName)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [code, setCode] = React.useState('')
  const navigate = useNavigate()
  const { id, nextStage } = useExperiment()

  useConfirmBeforeLeave()

  const submit = useCallback(async () => {
    if (isSubmitting || !lecture || !fileName) {
      return
    }
    setIsSubmitting(true)
    await Post<PostAssessmentCodeParams, PostAssessmentCodeResults>(`${SERVER_ADDRESS}/postAssessmentCode`, {
      participantId: id,
      lectureName: lecture,
      fileName,
      code,
    })
    setIsSubmitting(false)
    setCode('')
    navigate(await nextStage())
  }, [code, fileName, id, isSubmitting, lecture, navigate, nextStage])

  const moveOnToNextProblem = useCallback(() => {
    if (window.confirm(getString('assessment_confirm_submit'))) {
      submit()
    }
  }, [submit])

  const onTimeout = useCallback(() => {
    window.alert(getString('assessment_alert_time_up'))
    submit()
  }, [submit])

  return (
    <Page onTimeOut={onTimeout}>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer
          footer={
            <button className="submit" type="submit" onClick={moveOnToNextProblem} disabled={isSubmitting}>
              {getString('assessment_action_button')}
            </button>
          }
        >
          <h1>{`${getString('assessment_title')} ${getProblemNumber()}`}</h1>
          <div>{getString('assessment_instruction')}</div>
          <ProblemContainer problem={problem} />
        </InstructionContainer>
        <CodeEditor code={code} editorKey={fileName} onCodeChange={setCode} />
      </SplitView>
    </Page>
  )
}
