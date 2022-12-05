import styled from '@emotion/styled'
import produce from 'immer'
import React, { useCallback, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { Page } from '../components/Page'
import ProblemContainer from '../components/ProblemContainer'
import { InstructionContainer } from '../components/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useProblem } from '../hooks/useProblem'
import { PostParsonsAnswerParams, PostParsonsAnswerResults } from '../protocol/PostParsonsAnswer'
import { Color } from '../shared/Common'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'

type MatchParams = {
  lecture: string
  fileName: string
}

export function Parsons() {
  const { lecture, fileName } = useParams<MatchParams>()
  const problem = useProblem(lecture, fileName)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [stepList, setStepList] = useState<{ idx: number; code: string }[]>([
    { idx: 0, code: 'lcv = lcv + 1' },
    { idx: 1, code: 'if (count > 0):' },
    { idx: 2, code: 'while (lcv < len(rain)):' },
    { idx: 3, code: 'else:' },
    { idx: 4, code: 'sumRain = sumRain + rain[lcv]\ncount = count + 1' },
    { idx: 5, code: 'lcv = 0' },
    { idx: 6, code: 'ave = sumRain / count\nprint(ave)' },
    { idx: 7, code: 'rain = [0, 5, 1, 0, -1, 6, 7, -2, 0]\nsumRain = 0\ncount = 0' },
    { idx: 8, code: 'print("No rain")' },
    { idx: 9, code: 'if (rain[lcv] >= 0):' },
  ])
  const [answerList, setAnswerList] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  const submit = useCallback(async () => {
    if (isSubmitting) {
      return
    }
    if (lecture && fileName) {
      setIsSubmitting(true)
      await Post<PostParsonsAnswerParams, PostParsonsAnswerResults>(`${SERVER_ADDRESS}/postParsonsAnswer`, {
        participantId: getId() ?? ID_NOT_FOUND,
        lectureName: lecture,
        fileName,
        answerList,
      })
      setIsSubmitting(false)
    }
  }, [answerList, fileName, isSubmitting, lecture])

  const onSubmitBtnClick = useCallback(() => {
    if (window.confirm(getString('parsons_confirm_submit'))) {
      submit()
    }
  }, [submit])

  const onTimeout = useCallback(() => {
    window.alert(getString('parsons_alert_time_up'))
    submit()
  }, [submit])

  const onListChange = useCallback(
    (item: number, destination: number) => {
      const newStepList = produce(stepList, draft => {
        draft.splice(destination, 0, draft.splice(item, 1)[0])
      })
      const newAnswerList = newStepList.reduce<number[]>((lst, { idx }, i) => {
        lst[idx] = i
        return lst
      }, [])

      setStepList(newStepList)
      setAnswerList(newAnswerList)
    },
    [stepList]
  )

  return (
    <Page onTimeOut={onTimeout}>
      <InstructionTask
        instruction={
          <InstructionContainer
            instruction={
              <div>
                <h1>{`${getString('parsons_title')} 5`}</h1>
                <div>{getString('parsons_instruction')}</div>
                <ProblemContainer problem={problem} />
              </div>
            }
            task={<div />}
            footer={
              <button className="submit" type="submit" onClick={onSubmitBtnClick} disabled={isSubmitting}>
                {getString('parsons_action_button')}
              </button>
            }
          />
        }
        task={
          <DragDropContext
            onDragEnd={res => {
              const { destination, source } = res
              if (destination != null) {
                onListChange(source.index, destination.index)
              }
            }}
          >
            <Droppable droppableId="droppable" direction="vertical">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: '100%' }}>
                  {stepList.map((step, i) => (
                    <Draggable draggableId={step.idx.toString()} index={i} key={step.idx}>
                      {provided => (
                        <DraggableItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span style={{ userSelect: 'none' }}>{step.code}</span>
                        </DraggableItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        }
      />
    </Page>
  )
}

const DraggableItem = styled.div`
  border: 1px solid ${Color.Gray15};
  font-size: 18px;
  padding: 5px;
  white-space: pre;
  margin: 10px;
`
