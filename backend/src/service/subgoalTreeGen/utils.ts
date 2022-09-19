import { Subgoal } from '../../dataType/subgoal'
import { SubgoalTree } from '../../dataType/subgoalTree'

export function collapseDuplicateSubgoals(subgoals: Subgoal[]): Array<Subgoal> {
  const distinctSubgoals: Array<Subgoal> = []
  subgoals.forEach(subgoal => {
    const duplicateSubgoal = distinctSubgoals.find(distinctSet => distinctSet.hasEqualSteps(subgoal))
    if (duplicateSubgoal === undefined) {
      const clone = new Subgoal(subgoal.steps)
      clone.label = new Set(subgoal.label)
      distinctSubgoals.push(clone)
    } else {
      duplicateSubgoal.count += 1
      for (const labelFromDup of Array.from(subgoal.label)) {
        duplicateSubgoal.label.add(labelFromDup)
      }
    }
  })
  return distinctSubgoals
}

export function sortHierarchy(hierarchy: SubgoalTree): SubgoalTree {
  return new SubgoalTree(
    hierarchy.item,
    hierarchy.children
      .sort((a, b) => {
        if (a.item && b.item) {
          return Array.from(a.item.steps).join(',').localeCompare(Array.from(b.item.steps).join(','))
        }
        return 0
      })
      .map(child => sortHierarchy(child))
  )
}

export function filterGoalsAboveThreshold(threshold = 1) {
  return (goals: Subgoal[]) => goals.filter(goal => goal.count >= threshold)
}
