import { withBase } from 'ufo'

export function siteBase(path: string, baseURL?: string) {
  return withBase(path, baseURL ?? useRuntimeConfig().app.baseURL)
}
