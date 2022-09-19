import styled from '@emotion/styled'
import produce from 'immer'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import ProblemContainer from '../components/ProblemContainer'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { PostParsonsAnswerParams, PostParsonsAnswerResults } from '../protocol/PostParsonsAnswer'
import { Color } from '../shared/Common'
import { getId, ID_NOT_FOUND, nextStage, shouldMoveStage } from '../shared/ExperimentHelper'
import { Get, Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'

interface MatchParams {
  lecture: string
  fileName: string
}

interface State {
  problem: string
  isSubmitting: boolean
  answerList: number[]
  stepList: { idx: number; code: string }[]
}

class Parsons extends React.Component<RouteComponentProps<MatchParams>, State> {
  constructor(props: RouteComponentProps<MatchParams>) {
    super(props)
    this.state = {
      problem: '',
      isSubmitting: false,
      answerList: Array(10).map((_, i) => i),
      stepList: [
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
      ],
    }
  }

  componentDidMount() {
    Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(
      `${SERVER_ADDRESS}/getProblemMarkDown`,
      {
        lectureName: this.props.match.params.lecture,
        fileName: this.props.match.params.fileName,
      },
      result => {
        this.setState({
          problem: result.problem,
        })
      },
      error => window.alert(error.message)
    )
    if (shouldMoveStage()) {
      this.props.history.push(nextStage())
    }
  }

  onSubmitBtnClick = () => {
    if (window.confirm(getString('parsons_confirm_submit'))) {
      this.submit()
    }
  }

  submit = () => {
    if (this.state.isSubmitting) {
      return
    }
    this.setState({
      isSubmitting: true,
    })
    Post<PostParsonsAnswerParams, PostParsonsAnswerResults>(
      `${SERVER_ADDRESS}/postParsonsAnswer`,
      {
        participantId: getId() ?? ID_NOT_FOUND,
        lectureName: this.props.match.params.lecture,
        fileName: this.props.match.params.fileName,
        answerList: this.state.answerList,
      },
      () => {
        this.setState(
          {
            isSubmitting: false,
          },
          () => this.props.history.push(nextStage())
        )
      },
      error => {
        this.setState(
          {
            isSubmitting: false,
          },
          () => window.alert(error.message)
        )
      }
    )
  }

  onTimeout = () => {
    window.alert(getString('parsons_alert_time_up'))
    this.submit()
  }

  onListChange = (item: number, destination: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.stepList.splice(destination, 0, draft.stepList.splice(item, 1)[0])
        draft.answerList = draft.stepList.reduce((lst, { idx }, i) => {
          lst[idx] = i
          return lst
        }, [] as number[])
      })
    )
  }

  render() {
    return (
      <div>
        <Header onTimeOut={this.onTimeout} />
        <InstructionTask
          instruction={
            <TaskContainer
              instruction={
                <div>
                  <h1>{`${getString('parsons_title')} 5`}</h1>
                  <div>{getString('parsons_instruction')}</div>
                  <ProblemContainer problem={this.state.problem} />
                </div>
              }
              task={<div />}
              footer={
                <button
                  className="submit"
                  type="submit"
                  onClick={this.onSubmitBtnClick}
                  disabled={this.state.isSubmitting}
                >
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
                  this.onListChange(source.index, destination.index)
                }
              }}
            >
              <Droppable droppableId="droppable" direction="vertical">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef} style={{ height: '100%' }}>
                    {this.state.stepList.map((step, i) => (
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
      </div>
    )
  }
}

const DraggableItem = styled.div`
  border: 1px solid ${Color.Gray15};
  font-size: 18px;
  padding: 5px;
  white-space: pre;
  margin: 10px;
`

export default Parsons
