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
    isVariable: true,
    url: [
      { group: 'A', url: '/verbal-analogy' },
      { group: 'B', url: '/label-tutorial' },
      { group: 'C', url: '/vote-tutorial' },
    ],
    canRevisit: true,
    timeLimit: 600,
  },
  {
    name: `${getString('progress_bar_stage_worked_example')} 1`,
    isVariable: true,
    url: [
      { group: 'A', url: '/worked-example/test/example1.py' },
      { group: 'B', url: '/label/test/example1.py' },
      { group: 'C', url: '/vote/test/example1.py' },
    ],
    canRevisit: true,
    timeLimit: 0,
  },
  {
    name: `${getString('progress_bar_stage_practice')} 1`,
    url: '/practice/test/practice1-1.py',
    timeLimit: 300,
  },
  {
    name: `${getString('progress_bar_stage_worked_example')} 2`,
    isVariable: true,
    url: [
      { group: 'A', url: '/worked-example/test/example2.py' },
      { group: 'B', url: '/label/test/example2.py' },
      { group: 'C', url: '/vote/test/example2.py' },
    ],
    canRevisit: true,
    timeLimit: 0,
  },
  {
    name: `${getString('progress_bar_stage_practice')} 2`,
    url: '/practice/test/practice2-1.py',
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
