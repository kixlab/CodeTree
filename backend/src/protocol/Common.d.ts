export type ID = string

export type Group = 'A' | 'B' | 'C'

export type CodeType = 'python' | 'javascript' | 'cpp'

export type Subgoal = {
  label: string
  group: number[]
}
