// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

interface EnvParser<T> {
  (str: string | null | undefined, defaultValue: T): T;
}

const parseNumber: EnvParser<number> = (str, defaultValue) =>
  str != null ? parseInt(str, 10) : defaultValue;

const parseArray: EnvParser<string[]> = (str, defaultValue) => {
  return str != null ? (str.includes(',') ? str.split(',') : [str]) : defaultValue;
};

export interface AppEnv {
  tokens: string[];
  channelId: string | undefined;
  minWaitTimeMine: number;
  maxWaitTimeMine: number;
  minWaitTimeFlip: number;
  maxWaitTimeFlip: number;
  minWaitTimeStats: number;
  maxWaitTimeStats: number;
}

const appEnv: AppEnv = {
  tokens: parseArray(process.env.DISCORD_TOKENS, []),
  channelId: process.env.DISCORD_CHANNEL_ID,
  minWaitTimeMine: parseNumber(process.env.MIN_WAITTIME_MINE, 189000),
  maxWaitTimeMine: parseNumber(process.env.MAX_WAITTIME_MINE, 189000),
  minWaitTimeFlip: parseNumber(process.env.MIN_WAITTIME_FLIP, 609000),
  maxWaitTimeFlip: parseNumber(process.env.MAX_WAITTIME_FLIP, 609000),
  minWaitTimeStats: parseNumber(process.env.MIN_WAITTIME_STATS, 3600000),
  maxWaitTimeStats: parseNumber(process.env.MAX_WAITTIME_STATS, 3780000),
};

export default appEnv;
