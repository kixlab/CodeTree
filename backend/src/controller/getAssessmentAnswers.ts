import { Get } from '../HttpResponse'
import { GetAssessmentAnswersParams, GetAssessmentAnswersResults } from '../protocol/GetAssessmentAnswers'
import { GetData2 } from '../database/DataBaseRef'
import { AssessmentData } from '../database/DataBaseDataTypes'
import { replaceTag } from '../utils/string'

export const GetAssessmentAnswersController = Get<GetAssessmentAnswersParams, GetAssessmentAnswersResults>(
  async ({ problemNumber }, send) => {
    try {
      const snapshot = await GetData2<AssessmentData>(`/cs101_sample_code/test/assessment${problemNumber}`)
      if (snapshot === null || snapshot.submissions === undefined) {
        throw new Error(`no snapshot ${problemNumber}`)
      }

      const { submissions } = snapshot
      let page = '<table>'
      for (const key of Object.keys(submissions)) {
        const { code } = submissions[key]
        page += `<tr><td>${key}</td><td><pre>${replaceTag(code)}</pre></td></tr>`
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
