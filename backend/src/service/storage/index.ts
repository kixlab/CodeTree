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
              if (!downloadErr) {
                resolve(content.toString('utf8'))
              } else {
                reject(downloadErr.message)
              }
            })
          } else {
            reject(getFileErr?.message ?? '')
          }
        }
      )
    })
  }

  async getFiles(path: string, sortingOptions = { numeric: true, sensitivity: 'base' }) {
    const [files] = await this.bucket.getFiles({
      prefix: path,
    })

    return Promise.all(
      files
        .filter(file => file.name !== path)
        .sort((a, b) => a.name.localeCompare(b.name, undefined, sortingOptions))
        .map(async file => {
          const [content] = await file.download()
          return { name: file.name, content: content.toString('utf8') }
        })
    )
  }
}

export const storageService = new StorageService()
