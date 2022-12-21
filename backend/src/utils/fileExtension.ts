import { CodeType } from '../protocol/Common'

export function languageToExtension(lang: CodeType) {
  if (lang === 'python') {
    return 'py'
  } else if (lang === 'cpp') {
    return 'cpp'
  } else if (lang === 'javascript') {
    return 'js'
  } else {
    return ''
  }
}
