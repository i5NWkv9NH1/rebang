export function zhStringtoNum(str: string): number {
  if (str.includes('万')) {
    const arr = str.split('万')
    return +arr[0] * 10000
  }

  return 0
}
