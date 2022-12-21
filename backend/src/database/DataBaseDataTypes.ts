import { VotingItem, VotingChoice } from '../protocol/Common'

type GroupType = 'A' | 'B' | 'C'

export interface CodeSubmissionData {
  code: string
  codeType: 'python' | 'javascript' | 'cpp'
}

export interface ProgressData {
  timeRemaining: number
}

export interface SubgoalData {
  label: string
  group: number[]
  parentId: number | null
}

export interface SubgoalsData {
  [key: string]: SubgoalData[]
}

export interface LabelVoteData {
  label: string
  voteCount: number
  exposure: number
}

export interface SubgoalNodeData {
  labels?: LabelVoteData[]
  group: number[]
  half?: number
}

export interface SubgoalTreeData {
  subgoalNodes: SubgoalNodeData[]
  voteCnt: number
}

export interface ChoiceListData {
  [key: string]: VotingChoice[]
}

export interface ProblemData {
  subgoals: SubgoalsData[]
  subgoalTree?: SubgoalTreeData
  choiceList?: ChoiceListData
  votingItems?: VotingItem[]
  submissions?: {
    [participantId: string]: {
      [timestamp: string]: CodeSubmissionData
    }
  }
}

export interface GroupData {
  A: number
  B: number
  C?: number
  finishedParticipants?: string[]
  lastAssignment: string
  maxParticipantNum: number
}

export interface ParticipantData {
  group: GroupType
  time: string
  lastTimestamp: EpochTimeStamp
  progress?: {
    [key: string]: ProgressData
  }
}

export interface ExperimentData {
  group: GroupData
  participants: {
    [key: string]: ParticipantData
  }
}
