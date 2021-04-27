export function randomNumber(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const sleep = (timeoutMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeoutMs));

export const getRandom = (): number => {
  return Math.floor(Math.random() * 10);
};
