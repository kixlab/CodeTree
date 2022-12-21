import { Post } from '../HttpResponse'
import { PostSuggestionBySubgoalsParams, PostSuggestionBySubgoalsResults } from '../protocol/PostSuggestionBySubgoals'
import { suggestionService } from '../service/suggestion'

export const postSuggestionBySubgoalsController = Post<PostSuggestionBySubgoalsParams, PostSuggestionBySubgoalsResults>(
  async ({ category, problemId, subgoals }) => {
    const subgoalsWithSuggestion = await Promise.all(
      subgoals.map(async ({ label, group, parentId }) => {
        const suggestions = await suggestionService.suggestAlgorithm(label)
        return { label, group, suggestions, parentId }
      })
    )

    return { subgoalsWithSuggestion }
  }
)
