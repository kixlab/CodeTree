import { Get } from '../HttpResponse'
import { GetHealthParams, GetHealthResults } from '../protocol/GetHealth'

const deployTime = Date.now()

export const getHealthController = Get<GetHealthParams, GetHealthResults>(async params => {
  return { status: deployTime.toLocaleString() }
})
