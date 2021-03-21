export async function delay(milliseconds: number): Promise<void> {
  if (milliseconds <= 0) {
    throw new Error('要等待的毫秒数必须大于0')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milliseconds)
  })
}
