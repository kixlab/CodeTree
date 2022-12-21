export type ID = string

export type Group = 'A' | 'B' | 'C'

export type CodeType = 'python' | 'javascript' | 'cpp'

export type Subgoal = {
  label: string
  group: number[]
  parentId: number | null
}

export interface VotingItem {
  id: number
  group: number[]
  labels: string[]
  answers: number[]
}

export interface VotingChoice {
  id: number
  labels: string[]
}
