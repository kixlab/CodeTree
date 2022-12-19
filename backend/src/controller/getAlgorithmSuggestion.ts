import { Get } from '../HttpResponse'
import { GetAlgorithmSuggestionParams, GetAlgorithmSuggestionResults } from '../protocol/GetAlgorithmSuggestion'
import { suggestionService } from '../service/suggestion'

export const getAlgorithmSuggestionController = Get<GetAlgorithmSuggestionParams, GetAlgorithmSuggestionResults>(
  async ({ category, problemId, subgoal }) => {
    const suggestions = await suggestionService.suggestAlgorithm(subgoal)

    return { suggestions }
  }
)
