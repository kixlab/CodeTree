import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { Subgoal } from '../protocol/Common'
import { PostSuggestionBySubgoalsParams, PostSuggestionBySubgoalsResults } from '../protocol/PostSuggestionBySubgoals'
import { Post } from '../shared/HttpRequest'
import { useExperiment } from './useExperiment'

export function useSuggestionBySubgoals(
  category: string | undefined,
  problemId: string | undefined,
  subgoals: Subgoal[]
) {
  const [suggestions, setSuggestions] = useState<PostSuggestionBySubgoalsResults['subgoalsWithSuggestion']>([])
  const { id } = useExperiment()

  useEffect(() => {
    if (category && problemId) {
      Post<PostSuggestionBySubgoalsParams, PostSuggestionBySubgoalsResults>(
        `${SERVER_ADDRESS}/postSuggestionBySubgoals`,
        {
          category,
          problemId,
          participantId: id,
          subgoals,
        }
      ).then(res => {
        if (res) {
          setSuggestions(res.subgoalsWithSuggestion)
        }
      })
    }
  }, [category, id, problemId, subgoals])

  return { suggestions }
}
