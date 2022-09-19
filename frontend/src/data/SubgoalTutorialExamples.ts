import { SubgoalNode } from '../pages/Label'
import { colorGenerator } from '../shared/Utils'

export const practice1 = `4x – 8 = 2x + 6
4x – 8 + 8 = 2x + 6 + 8
4x – 8 + 8 - 2x = 2x + 6 + 8 - 2x
4x – 2x = 6 + 8
2x = 14
2x / 2 = 14 / 2
x = 7`

export const practice2 = `x = 4 * (5 – 2) + 12 / (4 – 1) – 7
x = 4 * (3) + 12 / (3) – 7
x = 4 * 3 + 12 / 3 – 7
x = 12 + 4 – 7
x = 11`

export const practice3 = `x^2 - x - 2 = 0
(x + 1)(x - 2) = 0
x = -1 or x = 2`

const colorGen = colorGenerator()

export const practice1Subgoals: SubgoalNode[] = [
  {
    id: 0,
    label: '변수를 같은 변으로 모으기',
    group: [],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 1,
    label: '양변 정리하기',
    group: [],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 2,
    label: '변수의 계수를 1로 만들기',
    group: [],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
]

export const practice2Subgoals: SubgoalNode[] = [
  {
    id: 0,
    label: '',
    group: [0, 1],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 1,
    label: '',
    group: [2, 3],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 2,
    label: '',
    group: [4],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
]

export const practice3Subgoals: SubgoalNode[] = [
  {
    id: 10000,
    label: '이차방정식의 해 구하기',
    group: [0, 1, 2],
    children: [],
    parentId: null,
    depth: 0,
    color: colorGen(),
  },
]
