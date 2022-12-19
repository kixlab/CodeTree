import { colorGenerator } from '../shared/Utils'
import { SubgoalNode } from '../types/subgoalNode'

export const PRACTICE_EXAMPLE1 = `def mergeSort(list):
  if len(list) <= 1:
      return list
  else:
    mid = len(list) // 2
    left = mergeSort(list[:mid])
    right = mergeSort(list[mid:])
    sorted = []
    while len(left) + len(right) > 0:
        if len(left) > 0 and len(right) > 0:
            if left[0] <= right[0]:
                sorted.append(left.pop(0))
            else:
                sorted.append(right.pop(0))
        elif len(left) > 0:
            sorted.append(left.pop(0))
        elif len(right) > 0:
            sorted.append(right.pop(0))
    return sorted`

export const PRACTICE_EXAMPLE2 = PRACTICE_EXAMPLE1

export const PRACTICE_EXAMPLE3 = PRACTICE_EXAMPLE1

const colorGen = colorGenerator()

export const practice1Subgoals: SubgoalNode[] = [
  {
    id: 0,
    label: '리스트를 정렬할 필요가 없는 경우 확인하기',
    group: [],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 1,
    label: '리스트를 반으로 나누어 각각 정렬하기',
    group: [],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 2,
    label: '정렬된 두 리스트를 정렬된 하나로 합치기',
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
    id: 10000,
    label: '정렬된 두 리스트를 정렬된 하나로 합치기',
    group: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    children: [],
    parentId: null,
    depth: 0,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 0,
    label: '',
    group: [9, 10, 11, 12, 13],
    children: [],
    parentId: 10000,
    depth: 1,
    canAddSubgoal: false,
    color: colorGen(),
  },
  {
    id: 1,
    label: '',
    group: [14, 15, 16, 17],
    children: [],
    parentId: 10000,
    depth: 1,
    canAddSubgoal: false,
    color: colorGen(),
  },
]

export const practice3Subgoals: SubgoalNode[] = [
  {
    id: 10000,
    label: '결과 리스트에 각 리스트의 최소값 중 작은 값 추가하기',
    group: [9, 10, 11, 12, 13],
    children: [],
    parentId: null,
    depth: 0,
    color: colorGen(),
  },
]
