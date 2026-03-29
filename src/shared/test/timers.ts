export async function advanceFakeTime(ms: number) {
  jest.advanceTimersByTime(ms);
  await Promise.resolve();
}
