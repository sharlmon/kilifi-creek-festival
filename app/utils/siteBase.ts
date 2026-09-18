import { withBase } from 'ufo'

export function siteBase(path: string) {
  return withBase(path, useRuntimeConfig().app.baseURL)
}
