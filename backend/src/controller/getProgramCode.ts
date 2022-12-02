import { Get } from '../HttpResponse'
import { GetProgramCodeParams, GetProgramCodeResults } from '../protocol/GetProgramCode'
import { storageService } from '../service/storage'

export const getProgramCodeController = Get<GetProgramCodeParams, GetProgramCodeResults>(async (params) => {
  const code = await storageService.getFile(`cs101_sample_code/${params.lectureName}/${params.fileName}`)
  return { code }
})
