export interface CommonItem {
  id?: string | number
  title: string
  caption?: string
  originUrl: string
  thumbnailUrl?: string
  createdAt?: number | string
  type?: 'article' | 'video'
}

export interface JobData<T = any[], K = undefined> {
  name?: string
  scope?: string
  key?: string
  createdAt?: number
  updatedAt?: number
  items: T
  meta?: K
}

export type GetReturnDataType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>

export interface ServiceType<T> extends Function {
  new (...args: any[]): T
}
