import { SubgoalNode } from '../pages/Label'

export function getExampleNumber(): number {
  return parseInt(window.location.href.split('/').pop()?.split('example')[1]?.[0] ?? '', 10)
}

export function getPracticeNumber(): number {
  return parseInt(window.location.href.split('/').pop()?.split('practice')[1]?.[0] ?? '', 10)
}

export function getProblemNumber(): number {
  return parseInt(window.location.href.split('/').pop()?.split('assessment')[1]?.[0] ?? '', 10)
}

const SUBGOAL_LABELS = 'SUBGOAL_LABELS'

export function saveSubgoals(labels: SubgoalNode[], fileName: string) {
  localStorage.setItem(`${SUBGOAL_LABELS}|${fileName}`, JSON.stringify(labels))
}

export function getSubgoals(fileName: string): SubgoalNode[] {
  return JSON.parse(localStorage.getItem(`${SUBGOAL_LABELS}|${fileName}`) ?? '[]') as SubgoalNode[]
}

export function colorGenerator() {
  const colors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
  ]
  let i = 0
  return () => {
    i += 1
    return colors[i % colors.length]
  }
}
