import { firebaseAdmin } from '../../utils/firebaseAdmin'

class StorageService {
  private bucket = firebaseAdmin.storage().bucket()

  async getFile(path: string) {
    return new Promise<string>((resolve, reject) => {
      this.bucket.getFiles(
        {
          prefix: path,
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

  async getFiles(path: string) {
    const [files] = await this.bucket.getFiles({
      prefix: path,
    })

    return Promise.all(
      files
        .filter(file => file.name !== path)
        .map(async file => {
          const [content] = await file.download()
          return content.toString('utf8')
        })
    )
  }
}

export const storageService = new StorageService()
