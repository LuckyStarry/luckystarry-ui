export function capitalize(text: string): string {
  if (!text) {
    return ''
  }
  text = text.toString()
  return text.charAt(0).toUpperCase() + text.slice(1)
}
