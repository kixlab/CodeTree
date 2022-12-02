import { Get } from '../HttpResponse'
import { GetHealthParams, GetHealthResults } from '../protocol/GetHealth'

export const getHealthController = Get<GetHealthParams, GetHealthResults>(async (params) => {
  return { status: "good" }
})
