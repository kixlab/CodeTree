import { Get } from '../HttpResponse'
import { GetHealthParams, GetHealthResults } from '../protocol/GetHealth'

export const getHealthController = Get<GetHealthParams, GetHealthResults>(async (params, send) => {
  try {
    send(200, { status: "good" })
  } catch (error) {
    send(500, {
      message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error,
    })
  }
})
