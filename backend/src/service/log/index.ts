import { CodeSubmissionData } from '../../database/DataBaseDataTypes'
import { SetData } from '../../database/DataBaseRef'

class LogService {
  async logPracticeSubmission(category: string, problemId: string, participantId: string, code: string): Promise<void> {
    await SetData<CodeSubmissionData>(`/${category}/${problemId}/submissions/${participantId}/${Date.now()}`, { code })
  }
}

export const logService = new LogService()
