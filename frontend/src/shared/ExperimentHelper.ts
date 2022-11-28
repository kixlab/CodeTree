import { SCENARIO, GroupUrl, Stage } from './Scenario'
import { getString } from './Localization'
import { Post } from './HttpRequest'
import { PostParticipantProgressParams, PostParticipantProgressResult } from '../protocol/PostParticipantProgress'
import { SERVER_ADDRESS, PRODUCTION } from '../environments/Configuration'

const PARTICIPANT_ID_KEY = 'PARTICIPANT_ID_KEY'
const PARTICIPANT_GROUP_KEY = 'PARTICIPANT_GROUP_KEY'
const PARTICIPANT_STAGE = 'PARTICIPANT_STAGE'
const TIME_STAMP = 'TIME_STAMP'
export const ID_NOT_FOUND = 'ID_NOT_FOUND'

type Group = 'A' | 'B' | 'C'

export function getId(): string | null {
  const id = localStorage.getItem(PARTICIPANT_ID_KEY)
  if (id !== null) {
    return id
  }
  return null
}

export function getGroup(): Group | null {
  const group = localStorage.getItem(PARTICIPANT_GROUP_KEY)
  if (group !== null) {
    return group as Group
  }
  return null
}

export function initialize(id: string, group: string) {
  localStorage.setItem(PARTICIPANT_ID_KEY, id)
  localStorage.setItem(PARTICIPANT_GROUP_KEY, group)
  localStorage.setItem(PARTICIPANT_STAGE, '0')
  localStorage.setItem(TIME_STAMP, new Date().getTime().toString())
}

export function nextStage(jump = 1): string {
  const id = getId()
  const group = getGroup()
  if (id === null || group === null) {
    return '/contact'
  }

  const currentStage = getCurrentStage()
  const participantStage = parseInt(localStorage.getItem(PARTICIPANT_STAGE) || '0', 10)
  if (currentStage === participantStage) {
    const nextStage = SCENARIO[participantStage + 1]
    Post<PostParticipantProgressParams, PostParticipantProgressResult>(
      `${SERVER_ADDRESS}/postParticipantProgress`,
      {
        participantId: id,
        stage: SCENARIO[getCurrentStage()].name,
        timeRemaining: getTimeRemaining(),
      },
      () => {},
      error => console.log(error)
    )
    localStorage.setItem(PARTICIPANT_STAGE, (participantStage + 1).toString())
    localStorage.setItem(TIME_STAMP, new Date().getTime().toString())
    if (nextStage.isVariable === true) {
      return (nextStage.url as GroupUrl[]).find(groupUrl => groupUrl.group === group)?.url || '/'
    }
    return nextStage.url as string
  }
  const nextStage = SCENARIO[participantStage + jump]
  if (nextStage.isVariable === true) {
    return (nextStage.url as GroupUrl[]).find(groupUrl => groupUrl.group === group)?.url || '/'
  }
  return nextStage.url as string
}

export function shouldMoveStage(): boolean {
  if (!PRODUCTION) {
    return false
  }
  const currentStage = getCurrentStage()
  const participantStage = parseInt(localStorage.getItem(PARTICIPANT_STAGE) || '0', 10)
  if (participantStage > currentStage && SCENARIO[currentStage]?.canRevisit !== true) {
    window.alert(getString('experiment_helper_not_allowed_to_go_back'))
    return true
  }
  return false
}

export function getTimeRemaining(): number {
  const currentStage = getCurrentStage()
  const timeLimit = SCENARIO[currentStage]?.timeLimit || 0
  const timeStamp = localStorage.getItem(TIME_STAMP) || new Date().getTime().toString()
  return timeLimit - Math.floor((new Date().getTime() - parseInt(timeStamp, 10)) / 1000)
}

export function hasTimeLimit(): boolean {
  return SCENARIO[getCurrentStage()]?.timeLimit !== 0
}

export function getStageList(): string[] {
  return SCENARIO.map(stage => stage.name)
}

export function getCurrentStage(): number {
  const currentUrl = window.location.pathname
  return SCENARIO.findIndex((stage: Stage) => {
    if (stage.isVariable) {
      return (stage.url as GroupUrl[]).find(groupUrl => groupUrl.url === currentUrl) || false
    }
    return stage.url === currentUrl
  })
}
