import { getPayload } from 'payload'
import config from '@payload-config'

let cached = (global as typeof globalThis & { payload?: Awaited<ReturnType<typeof getPayload>> }).payload

export async function getPayloadClient() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}
