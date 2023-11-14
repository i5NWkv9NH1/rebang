import UserAgent from 'user-agents'

type DeviceCategory = 'desktop' | 'tablet' | 'mobile'

export function genUserAgent(deviceCategory: DeviceCategory): string {
  const userAgent = new UserAgent({ deviceCategory })

  return userAgent.toString()
}
