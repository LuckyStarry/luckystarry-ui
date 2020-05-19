export function timestamp(value: number | Date): string {
  if (value) {
    if (typeof value === 'number') {
      return new Date(value).toLocaleString()
    } else {
      return value.toLocaleString()
    }
  }
  return 'N/A'
}
