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

const getString: EnvParser<string> = (str, defaultValue) => {
  return str != null ? str : defaultValue;
};

export interface AppEnv {
  tokens: string[];
  channelId: string | undefined;
  minWaitTimeMine: number;
  maxWaitTimeMine: number;
  minWaitTimeFlip: number;
  maxWaitTimeFlip: number;
  minWaitTimeSearch: number;
  maxWaitTimeSearch: number;
  minWaitTimeStats: number;
  maxWaitTimeStats: number;
  flipStyle: string;
  usernamesOutput: string[];
  adminUsernames: string[];
}

const appEnv: AppEnv = {
  tokens: parseArray(process.env.DISCORD_TOKENS, []),
  channelId: process.env.DISCORD_CHANNEL_ID,
  minWaitTimeMine: parseNumber(process.env.MIN_WAITTIME_MINE, 189000),
  maxWaitTimeMine: parseNumber(process.env.MAX_WAITTIME_MINE, 189000),
  minWaitTimeFlip: parseNumber(process.env.MIN_WAITTIME_FLIP, 609000),
  maxWaitTimeFlip: parseNumber(process.env.MAX_WAITTIME_FLIP, 609000),
  minWaitTimeSearch: parseNumber(process.env.MIN_WAITTIME_Search, 310000),
  maxWaitTimeSearch: parseNumber(process.env.MAX_WAITTIME_Search, 310000),
  minWaitTimeStats: parseNumber(process.env.MIN_WAITTIME_STATS, 3600000),
  maxWaitTimeStats: parseNumber(process.env.MAX_WAITTIME_STATS, 3780000),
  flipStyle: getString(process.env.FLIP_STYLE, 'HEAD'),
  usernamesOutput: parseArray(process.env.USERNAMES_OUTPUT, []),
  adminUsernames: parseArray(process.env.ADMIN_USERNAMES, []),
};

export default appEnv;
