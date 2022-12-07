import { Get } from '../HttpResponse'
import { GetHealthParams, GetHealthResults } from '../protocol/GetHealth'

const deployTime = new Date()

export const getHealthController = Get<GetHealthParams, GetHealthResults>(async () => {
  return { status: deployTime.toString() }
})
