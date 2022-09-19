import { Subgoal } from './subgoal'

export class SubgoalTree {
  item: Subgoal | null

  children: Array<SubgoalTree>

  constructor(item: Subgoal | null = null, children: Array<SubgoalTree> = []) {
    this.item = item
    this.children = children
  }

  toString(level?: number): string {
    if (this.children.length > 0) {
      return `${this.item}\n${this.children
        .map(child => `${'\t'.repeat(level || 0)}|---${child.toString((level || 0) + 1)}`)
        .join('\n')}`
    }
    return `${this.item}`
  }

  getSubgoalList(): Subgoal[] {
    const childrenSubgoalList: Subgoal[] = []
    this.children.forEach(child => {
      child.getSubgoalList().forEach(subgoal => childrenSubgoalList.push(subgoal))
    })
    if (this.item != null) {
      childrenSubgoalList.unshift(this.item)
    }
    return childrenSubgoalList.sort((a: Subgoal, b: Subgoal) => {
      const firstStepFromA = a.steps.values().next().value
      const firstStepFromB = b.steps.values().next().value
      if (firstStepFromA === firstStepFromB) {
        return a.steps.size > b.steps.size ? -1 : 1
      }
      if (firstStepFromA > firstStepFromB) {
        return 1
      }
      return -1
    })
  }

  findMissingSteps(): Set<number> {
    const missingSteps = new Set<number>()
    if (this.children.length > 0) {
      const steps = this.children.reduce((set, child) => {
        child.item?.steps?.forEach(step => set.add(step))
        return set
      }, new Set<number>())
      for (const step of this.item?.steps ?? []) {
        if (!steps.has(step)) {
          missingSteps.add(step)
        }
      }
    }
    return missingSteps
  }

  recursivelyAddMissingGoals() {
    this.children.forEach(child => child.recursivelyAddMissingGoals())
    const missingSteps = this.findMissingSteps()
    if (missingSteps.size > 0) {
      const newGoal = new Subgoal(missingSteps)
      const newHierarchy = new SubgoalTree(newGoal)
      this.children.push(newHierarchy)
    }
  }
}
