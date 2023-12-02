export function removeHtmlTag(str: string) {
  const regex = /(<([^>]+)>)/gi

  return str
    .replace(regex, '')
    .replace('网页链接', '')
    .replace('查看更多&gt;', '')
    .trim()
}
