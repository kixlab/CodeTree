import { uniq } from 'lodash'
import { SubgoalsData } from '../database/DataBaseDataTypes'
import { GetData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetCodeGroupsParams, GetCodeGroupsResults } from '../protocol/GetCodeGroups'
import { storageService } from '../service/storage'
import { replaceTag } from '../utils/string'

export const GetCodeGroupsController = Get<GetCodeGroupsParams, GetCodeGroupsResults>(
  async ({ problemNumber }, send) => {
    try {
      const snapshot = await GetData2<SubgoalsData>(`/cs101_sample_code/test/example${problemNumber}/subgoals`)
      if (snapshot === null) {
        throw new Error('No subgoals data found')
      }

      const codeLines = (await storageService.getFile(`cs101_sample_code/test/example${problemNumber}.py`)).split('\n')

      const codeGroups: string[] = []
      for (const key of Object.keys(snapshot)) {
        const userSubgoals = snapshot[key]
        userSubgoals.map(userSubgoal => codeGroups.push(userSubgoal.group.join(',')))
      }

      let page = '<table>'
      for (const codeGroup of uniq(codeGroups)) {
        const code = codeGroup
          .split(',')
          .map(n => parseInt(n, 10))
          .map(n => codeLines[n])
        page += `<tr><td><pre>${replaceTag(code.join('\n'))}</pre></td></tr>`
      }
      page += '</table>'
      send(200, page)
    } catch (error) {
      send(500, {
        message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
        error,
      })
    }
  }
)
