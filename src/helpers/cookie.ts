export function parseCookie(cookies: string[]): string {
  return cookies
    .map((item) => item.split(';')[0])
    .toString()
    .replace(',', ';')
}
