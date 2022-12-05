import { VotingItem } from '../protocol/GetVotingList'
import { VotingChoice } from '../protocol/PostVotingChoices'

type GroupType = 'A' | 'B' | 'C'

export interface CodeSubmissionData {
  code: string
}

export interface ParsonsAnswerData {
  answerList: string
}

export interface ProgressData {
  timeRemaining: number
}

export interface SubgoalData {
  label: string
  group: number[]
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

export interface ExampleData {
  problem: string
  subgoals: SubgoalsData[]
  subgoalTree?: SubgoalTreeData
  choiceList?: ChoiceListData
  votingItems?: VotingItem[]
}

export interface PracticeData {
  problem: string
  testCases?: {
    args: string
  }[]
  submissions?: {
    [key: string]: CodeSubmissionData
  }
}

export interface AssessmentData {
  problem: string
  skeleton?: string
  submissions?: {
    [key: string]: CodeSubmissionData
  }
}

export interface Assessment5Data {
  list: string[]
  problem: string
  submissions?: {
    [key: string]: ParsonsAnswerData
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
  lastTimestamp?: EpochTimeStamp
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
