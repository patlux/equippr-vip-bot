export function randomNumber(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const sleep = (timeoutMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeoutMs));

export const getRandom = (): number =>{
  return Math.floor(Math.random()*10)  
}

  export const randomHead = () => {
    if(getRandom() <= 8)
      return "kopf";
    return "Kopf";
  }

  export const randomTail = () => {
    if(getRandom() <= 6)
      return "zahl";
    return "Zahl";
  }
