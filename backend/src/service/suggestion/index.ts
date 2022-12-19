import { Configuration, OpenAIApi } from 'openai'
import { GPT_SUGGESTION_PROMT } from '../../constants/gptSuggestionPrompt'
import { getEnv } from '../../utils/getEnv'

const configuration = new Configuration({
  apiKey: getEnv().OPENAI_API_KEY,
})

class SueggestionService {
  private openai = new OpenAIApi(configuration)

  async suggestAlgorithm(subgoal: string) {
    const suggestion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: GPT_SUGGESTION_PROMT(subgoal),
      max_tokens: 100,
      temperature: 0,
    })

    return (
      suggestion.data.choices[0].text
        ?.split('\n')
        .filter(s => 0 < s.length)
        .map(s => s.split('.')[1].trim()) ?? []
    )
  }
}

export const suggestionService = new SueggestionService()
