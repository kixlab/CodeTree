import { CodeSubmissionData, ProblemData } from '../../database/DataBaseDataTypes'
import { GetData } from '../../database/DataBaseRef'
import { ID } from '../../protocol/Common'

class CodeSubmissionService {
  async getSubmissions(category: string, problemId: string) {
    const submissions = await GetData<ProblemData['submissions']>(`/${category}/${problemId}/submissions`)

    if (!submissions) {
      throw new Error('No submissions')
    }

    return submissions
  }

  async getLatestSubmissionOfParticipant(category: string, problemId: string, participantId: ID) {
    const submissions = await GetData<{ [timestamp: string]: CodeSubmissionData }>(
      `/${category}/${problemId}/submissions/${participantId}`
    )

    let latest = ''
    for (const timestamp in submissions) {
      if (0 < timestamp.localeCompare(latest, undefined, { numeric: true })) {
        latest = timestamp
      }
    }

    const code = submissions?.[latest]?.code ?? ''

    return { code }
  }
}

export const codeSubmissionService = new CodeSubmissionService()
