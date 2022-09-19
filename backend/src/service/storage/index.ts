import { firebaseAdmin } from '../../utils/firebaseAdmin'

class StorageService {
  private bucket = firebaseAdmin.storage().bucket()

  async getFile(path: string) {
    return new Promise<string>((resolve, reject) => {
      this.bucket.getFiles(
        {
          prefix: `cs101_sample_code/${path}`,
        },
        (getFileErr, files) => {
          if (files) {
            files[0]?.download((downloadErr, content) => {
              if (content) {
                resolve(content.toString('utf8'))
              } else {
                reject(downloadErr?.message ?? '')
              }
            })
          } else {
            reject(getFileErr?.message ?? '')
          }
        }
      )
    })
  }
}

export const storageService = new StorageService()
