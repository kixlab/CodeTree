import { Subgoal } from '../../dataType/subgoal'
import { SubgoalTree } from '../../dataType/subgoalTree'

class SubgoalTreeGenService {
  private generateTree(goals: Subgoal[], scoreFn: (goal: Subgoal) => number): SubgoalTree {
    const sortedGoals = goals
      .map(goal => ({
        score: scoreFn(goal),
        goal,
      }))
      .sort((s1, s2) => s2.score - s1.score)
      .map(({ goal }) => goal)
    const tree = new SubgoalTree()
    for (const goal of sortedGoals) {
      let currentNode = tree
      const hierarchy = new SubgoalTree(goal)
      let hasPartialOverlap = false
      while (currentNode.item?.isSuperSetOf(goal) ?? true) {
        const subgoalIdxs: number[] = []
        let next = null
        for (let i = 0; i < currentNode.children.length; i += 1) {
          const child = currentNode.children[i]
          // check if goal can be a higher goal of any child
          if (child.item?.isSubsetOf(goal)) {
            subgoalIdxs.push(i)
          }
          // check if goal has a mismatch with any previously added child
          if (child.item?.hasPartialOverlapWith(goal)) {
            hasPartialOverlap = true
            break
          }
          // check if goal is a lower goal of any child
          if (child.item?.isSuperSetOf(goal)) {
            next = child
            break
          }
        }

        // is invalid
        if (hasPartialOverlap) {
          break
          // is a higher goal
        } else if (subgoalIdxs.length > 0) {
          hierarchy.children.push(...currentNode.children.filter((_, i) => subgoalIdxs.includes(i)))
          currentNode.children = currentNode.children.filter((_, i) => !subgoalIdxs.includes(i))
          // is a sibling goal
        } else if (next === null) {
          break
          // is a lower goal
        } else {
          currentNode = next
        }
      }
      if (!hasPartialOverlap) {
        currentNode.children.push(hierarchy)
      }
    }

    // find missing goals and add them to the tree
    tree.children.map(child => child.recursivelyAddMissingGoals())

    return tree
  }

  private getInclusionScore(goal: Subgoal, goals: Subgoal[]): number {
    let score = 0
    for (const otherGoal of goals) {
      if (otherGoal.isSubsetOf(goal)) {
        score += otherGoal.count
      }
    }
    return score
  }

  generateTreeByMajorityAgreement(goals: Subgoal[]): SubgoalTree {
    return this.generateTree(goals, (goal: Subgoal) => goal.count)
  }

  generateTreeByInclusionScore(goals: Subgoal[]): SubgoalTree {
    return this.generateTree(goals, (goal: Subgoal) => this.getInclusionScore(goal, goals))
  }

  generateTreeByMajorityAgreementAndInclusionScore(goals: Subgoal[]): SubgoalTree {
    return this.generateTree(goals, (goal: Subgoal) => goal.count * 10000 + this.getInclusionScore(goal, goals))
  }
}

export const subgoalTreeGenService = new SubgoalTreeGenService()
