// eslint-disable-next-line @typescript-eslint/no-var-requires
const WordPOS = require('wordpos')

interface IWordPOS {
  isVerb: (word: string) => Promise<boolean>
}

class WordPosService {
  wpos: IWordPOS = new WordPOS()

  async isVerb(word: string): Promise<boolean> {
    return this.wpos.isVerb(word)
  }
}

export const wordPosService = new WordPosService()
