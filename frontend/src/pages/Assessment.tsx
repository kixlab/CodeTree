import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CodeEditor } from '../components/CodeEditor'
import { Page } from '../components/Page'
import { ProblemContainer } from '../components/ProblemContainer'
import { InstructionContainer } from '../components/InstructionContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useProblem } from '../hooks/useProblem'
import { PostAssessmentCodeParams, PostAssessmentCodeResults } from '../protocol/PostAssessmentCode'
import { getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { getProblemNumber } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'

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

  useConfirmBeforeLeave()

  const submit = useCallback(async () => {
    if (isSubmitting || !lecture || !fileName) {
      return
    }
    setIsSubmitting(true)
    await Post<PostAssessmentCodeParams, PostAssessmentCodeResults>(`${SERVER_ADDRESS}/postAssessmentCode`, {
      participantId: getId() ?? ID_NOT_FOUND,
      lectureName: lecture,
      fileName,
      code,
    })
    setIsSubmitting(false)
    setCode('')
    navigate(nextStage())
  }, [code, fileName, isSubmitting, lecture, navigate])

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
      <InstructionTask
        instruction={
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
        }
        task={<CodeEditor code={code} editorKey={fileName} onCodeChange={setCode} />}
      />
    </Page>
  )
}
