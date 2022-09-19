import fetch from 'node-fetch'
import { getEnv } from '../../utils/getEnv'

type Response = {
  return_object: {
    sentence: {
      morp: {
        lemma: string
        type: string
      }[]
    }[]
  }
}

class KoreanNlpService {
  private openApiURL = 'http://aiopen.etri.re.kr:8000/WiseNLU'

  private accessKey = getEnv().ETRI_API_KEY

  async parseMorpheme(text: string, typeArr = ['NNG', 'W', 'SL']): Promise<string[]> {
    try {
      const res = await fetch(this.openApiURL, {
        method: 'POST',
        body: JSON.stringify({
          access_key: this.accessKey,
          argument: {
            text,
            analysis_code: 'ner',
          },
        }),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      const response = (await res.json()) as Response

      return response.return_object.sentence[0].morp.filter(m => typeArr.some(t => t === m.type)).map(m => m.lemma)
    } catch (e) {
      console.error(e)
      return []
    }
  }
}

export const koreanNlpService = new KoreanNlpService()
