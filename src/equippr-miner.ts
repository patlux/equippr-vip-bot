import { getRandom } from './utils';

export const randomHead = (): 'Kopf' | 'kopf' => {
  if (getRandom() <= 8) return 'kopf';
  return 'Kopf';
};

export const randomTail = (): 'Zahl' | 'zahl' => {
  if (getRandom() <= 6) return 'zahl';
  return 'Zahl';
};

export type CoinFlipValues = ReturnType<typeof randomHead> | ReturnType<typeof randomTail>;

export function createFlipper(flipStyle: string): () => CoinFlipValues {
  let isHead = true;
  return (): CoinFlipValues => {
    switch (flipStyle) {
      case 'ROTATE': {
        const randomStaySame = getRandom();
        const current = isHead ? randomHead() : randomTail();

        //randomly do the same side twice
        if (randomStaySame <= 7) {
          isHead = !isHead;
        }

        return current;
      }
      case 'TAIL':
        return randomTail();
      case 'HEAD':
      default:
        return randomHead();
    }
  };
}
