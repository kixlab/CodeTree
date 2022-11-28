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
    timeLimit: 300,
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
    name: `${getString('progress_bar_stage_practice')} 1`,
    url: '/practice/pilot/p1',
    canRevisit: true,
    timeLimit: 300,
  },
  {
    name: `${getString('progress_bar_stage_worked_example')} 1`,
    url: '/label/pilot/p1',
    canRevisit: true,
    timeLimit: 0,
  },
  {
    name: `${getString('progress_bar_stage_practice')} 2`,
    url: '/practice/pilot/p1',
    timeLimit: 300,
  },
  {
    name: `${getString('progress_bar_stage_worked_example')} 2`,
    url: '/label/pilot/p2',
    canRevisit: true,
    timeLimit: 0,
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
