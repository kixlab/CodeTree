import { Configuration, OpenAIApi } from 'openai'
import { Get } from '../HttpResponse'
import { GetDocumentationParams, GetDocumentationResults } from '../protocol/GetDocumentation'
import { storageService } from '../service/storage'
import { getEnv } from '../utils/getEnv'

const configuration = new Configuration({
  apiKey: getEnv().OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const getDocumentationController = Get<GetDocumentationParams, GetDocumentationResults>(
  async ({ lectureName, fileName }, send) => {
    try {
      const code = await storageService.getFile(`${lectureName}/${fileName}`)

      const completion = await openai.createEdit('code-davinci-edit-001', {
        instruction: 'Add documentation for each line',
        input: code,
        temperature: 0.5,
      })
      send(200, {
        result: completion.data.choices?.[0].text ?? '',
      })
    } catch (error) {
      send(500, {
        message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
        error,
      })
    }
  }
)
