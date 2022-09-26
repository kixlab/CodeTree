import { SubgoalsData } from '../database/DataBaseDataTypes'
import { GetData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetLabelsParams, GetLabelsResults } from '../protocol/GetLabels'
import { storageService } from '../service/storage'
import { replaceTag } from '../utils/string'

export const GetLabelsController = Get<GetLabelsParams, GetLabelsResults>(async ({ problemNumber }, send) => {
  try {
    const snapshot = await GetData2<SubgoalsData>(`/cs101_sample_code/test/example${problemNumber}/subgoals`)
    if (snapshot === null) {
      throw new Error('No subgoals data found')
    }

    const codeLines = (await storageService.getFile(`cs101_sample_code/test/example${problemNumber}.py`)).split('\n')

    const labelsGroup = new Map<string, string[]>()
    for (const key of Object.keys(snapshot)) {
      const userSubgoals = snapshot[key]
      userSubgoals.forEach(userSubgoal => {
        const { label, group } = userSubgoal
        const groupKey = group.join(',')
        if (!labelsGroup.has(groupKey)) {
          labelsGroup.set(groupKey, [])
        }
        labelsGroup.get(groupKey)?.push(label)
      })
    }

    let page = '<table>'
    for (const groupKey of labelsGroup.keys()) {
      const code = groupKey
        .split(',')
        .map(n => parseInt(n, 10))
        .map(n => codeLines[n])
      const labels = labelsGroup.get(groupKey) ?? []
      page += `<tr><td><pre>${replaceTag(code.join('\n'))}</pre></td><td>${labels[0]}</td></tr>`
      for (let i = 1; i < labels.length; i += 1) {
        page += `<tr><td></td><td>${labels[i]}</td></tr>`
      }
    }
    page += '</table>'
    send(200, page)
  } catch (error) {
    send(500, {
      message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error,
    })
  }
})
