export function replaceTag(str: string) {
  return str.replace(/[&<>]/g, (tag: string) => {
    switch (tag) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      default:
        return tag
    }
  })
}
