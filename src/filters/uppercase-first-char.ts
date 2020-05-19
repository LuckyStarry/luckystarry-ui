export function uppercaseFirstChar(text: string): string {
  if (text && text.length > 1) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  return text
}
