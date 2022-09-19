export class Subgoal {
  steps: Set<number>

  label: Set<string>

  count: number

  static NOT_LABELED = 'not labeled yet'

  constructor(steps: Set<number>, label?: string) {
    this.steps = steps
    this.label = label != null ? new Set([label]) : new Set()
    this.count = 1
  }

  toString(): string {
    return `{Steps: [${Array.from(this.steps)
      .sort((a, b) => a - b)
      .join(', ')}]} ${this.label.size === 0 ? '(* new)' : ''}`
  }

  toJSON() {
    return {
      steps: [...this.steps],
      label: [...this.label],
      count: this.count,
    }
  }

  hasEqualSteps(target: Subgoal): boolean {
    if (this.steps.size !== target.steps.size) {
      return false
    }
    for (const step of Array.from(this.steps)) {
      if (!target.steps.has(step)) {
        return false
      }
    }
    return true
  }

  isSuperSetOf(target: Subgoal): boolean {
    if (this.steps.size < target.steps.size) {
      return false
    }
    for (const step of Array.from(target.steps)) {
      if (!this.steps.has(step)) {
        return false
      }
    }
    return true
  }

  isSubsetOf(target: Subgoal): boolean {
    if (target.steps.size < this.steps.size) {
      return false
    }
    for (const step of Array.from(this.steps)) {
      if (!target.steps.has(step)) {
        return false
      }
    }
    return true
  }

  hasPartialOverlapWith(target: Subgoal): boolean {
    const union = new Set([...this.steps, ...target.steps])
    return Math.max(this.steps.size, target.steps.size) < union.size && union.size < this.steps.size + target.steps.size
  }

  isNotLabeled(): boolean {
    return this.count === 0
  }
}
