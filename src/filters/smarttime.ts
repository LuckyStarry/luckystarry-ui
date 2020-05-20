export function smarttime(value: number): string {
  if (value) {
    return new Date(value).toSmartString()
  }
  return 'N/A'
}
