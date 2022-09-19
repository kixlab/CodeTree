import { Get } from '../HttpResponse'
import { GetProgramCodeParams, GetProgramCodeResults } from '../protocol/GetProgramCode'
import { storageService } from '../service/storage'

export const getProgramCodeController = Get<GetProgramCodeParams, GetProgramCodeResults>(async (params, send) => {
  try {
    const code = await storageService.getFile(`${params.lectureName}/${params.fileName}`)
    send(200, { code })
  } catch (error) {
    send(500, {
      message: '문제를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error,
    })
  }
})
