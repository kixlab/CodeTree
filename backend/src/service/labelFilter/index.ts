import { trim } from 'lodash'
import intersection from 'lodash/intersection'
import { Subgoal } from '../../dataType/subgoal'
import { koreanNlpService } from '../koreanNlp'

interface LabelDTO {
  label: string
  words: string[]
}

class LabelFilterService {
  async filterLabels(subgoals: Subgoal[], wordsBelow = 8, similarityBelow = 0.3): Promise<Subgoal[]> {
    let initialCnt = 0
    // 동시에 removeSimilarLabels를 부를 경우 Too many requests 에러가 나서 하나씩 차례로 실행
    for await (const subgoal of subgoals) {
      initialCnt += subgoal.label.size
      const labels = [...subgoal.label]
        .map(trim)
        .filter(this.removeLongLabels(wordsBelow))
        .filter(this.removeLabelsWithSymbols)
        .filter(this.removeLabelsWithWrongFormat)

      await this.removeSimilarLabels(labels, similarityBelow).then(labels => {
        subgoal.label = new Set(labels)
      })
    }
    let cnt = 0
    subgoals.forEach(subgoal => {
      subgoal.label.forEach(label => console.log(label))
      cnt += subgoal.label.size
    })
    console.log(`initial: ${initialCnt}, final: ${cnt}`)
    return subgoals
  }

  private removeLabelsWithSymbols(label: string): boolean {
    if (label.match(/<-|->|[!?@#]/)) {
      console.log(`"${label}"(removed) (symbol)`)
      return false
    }
    return true
  }

  private removeLongLabels(wordsBelow: number) {
    return (label: string) => {
      if (wordsBelow < label.split(' ').length) {
        console.log(`"${label}"(removed) (length)`)
        return false
      }
      return true
    }
  }

  private removeLabelsWithWrongFormat(label: string) {
    if (label[label.length - 1] === '기') {
      return true
    }
    console.log(`"${label}"(removed) (format)`)
    return false
  }

  private async removeSimilarLabels(labels: string[], threshold: number): Promise<string[]> {
    const labelDTOs: LabelDTO[] = []
    for await (const label of labels) {
      labelDTOs.push({
        label,
        words: await koreanNlpService.parseMorpheme(label),
      })
    }
    labelDTOs.sort((a, b) => b.words.length - a.words.length)
    const result: LabelDTO[] = []

    for (const labelDTO of labelDTOs) {
      if (
        result.every(label => {
          if (this.sorensenDiceSimilarity(label.words, labelDTO.words) < threshold) {
            return true
          }
          console.log(`"${labelDTO.label}"(removed) (similarity) (${label.label})`)
          return false
        })
      ) {
        result.push(labelDTO)
      }
    }

    return result.map(labelDTO => labelDTO.label)
  }

  private sorensenDiceSimilarity(a: string[], b: string[]): number {
    return (2 * intersection(a, b).length) / (a.length + b.length)
  }
}

export const labelFilterService = new LabelFilterService()
