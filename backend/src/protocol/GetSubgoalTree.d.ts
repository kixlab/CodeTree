export interface GetSubgoalTreeParams {
  lectureName: string
  fileName: string
}

interface SubgoalNode {
  label: string
  group: number[]
  children: SubgoalNode[]
}

export interface GetSubgoalTreeResults {
  tree: SubgoalNode
}
