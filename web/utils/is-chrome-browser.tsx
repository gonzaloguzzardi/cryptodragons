export default function isChromeBrowser(): boolean {
  return (
    navigator &&
    navigator.userAgent &&
    navigator.userAgent.includes('Chrome') &&
    navigator.vendor &&
    navigator.vendor.includes('Google Inc')
  )
}
