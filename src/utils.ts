export function randomNumber(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const sleep = (timeoutMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeoutMs));
