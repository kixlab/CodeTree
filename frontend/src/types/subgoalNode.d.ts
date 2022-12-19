export interface SubgoalNode {
  id: number
  label: string
  group: number[]
  children: number[]
  parentId: number | null
  depth: number
  canAddSubgoal?: boolean
  color?: string
}
