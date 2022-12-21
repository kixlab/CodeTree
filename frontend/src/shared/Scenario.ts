import { getString } from './Localization'

export interface GroupUrl {
  group: 'A' | 'B' | 'C'
  url: string
}

export interface Stage {
  isVariable?: boolean
  canRevisit?: boolean
  url: string | GroupUrl[]
  timeLimit: number
  name: string
}

export const SCENARIO: Stage[] = [
  {
    name: getString('progress_bar_stage_instruction'),
    url: '/instruction',
    timeLimit: 0,
  },
  {
    name: getString('progress_bar_stage_consent'),
    url: '/consent',
    timeLimit: 180,
  },
  {
    name: getString('progress_bar_stage_demographic'),
    url: '/demographic',
    timeLimit: 180,
  },
  {
    name: getString('progress_bar_stage_training'),
    url: '/label-tutorial',
    canRevisit: true,
    timeLimit: 600,
  },
  {
    name: '전체 탐색으로 풀기',
    url: '/practice/pilot/p2',
    canRevisit: true,
    timeLimit: 300,
  },
  {
    name: '풀이 단계 설명하기',
    url: '/abstraction/pilot/p2',
    canRevisit: true,
    timeLimit: 0,
  },
  {
    name: '코드 정리하기',
    url: '/reorganize/pilot/p2',
    canRevisit: true,
    timeLimit: 300,
  },
  {
    name: '풀이 단계랑 코드 잇기',
    url: '/connect/pilot/p2',
    canRevisit: true,
    timeLimit: 300,
  },
  {
    name: '효율적인 풀이 찾기',
    url: '/explore/pilot/p2',
    canRevisit: true,
    timeLimit: 300,
  },
  {
    name: getString('progress_bar_stage_survey'),
    url: '/survey',
    timeLimit: 0,
  },
  {
    name: getString('progress_bar_stage_wrapup'),
    url: '/wrapup',
    timeLimit: 0,
  },
]
