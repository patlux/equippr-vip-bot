import chalk from 'chalk';

import type { EquipprVipBotOptions } from './equippr';
import createEquipprVipBot from './equippr';
import createLogger from './logger';
import appEnv from './env';
import { assert } from './assert';

const DISCORD_TOKENS = appEnv.tokens;
const DISCORD_CHANNEL_ID = appEnv.channelId;

const { log } = createLogger('discord');

async function main() {
  log(chalk.gray('Start ...'));
  assert(DISCORD_TOKENS.length > 0, 'Missing DISCORD_TOKENS in .env');
  assert(DISCORD_CHANNEL_ID, 'Missing DISCORD_CHANNEL_ID in .env');

  const configuration: EquipprVipBotOptions = {
    tokens: DISCORD_TOKENS,
    channelId: DISCORD_CHANNEL_ID,
    minWaitTimeMine: appEnv.minWaitTimeMine,
    maxWaitTimeMine: appEnv.maxWaitTimeMine,
    minWaitTimeFlip: appEnv.minWaitTimeFlip,
    maxWaitTimeFlip: appEnv.maxWaitTimeFlip,
    minWaitTimeSearch: appEnv.minWaitTimeSearch,
    maxWaitTimeSearch: appEnv.maxWaitTimeSearch,
    minWaitTimeStats: appEnv.minWaitTimeStats,
    maxWaitTimeStats: appEnv.maxWaitTimeStats,
  };

  log('Your configuration:', configuration);
  const startEquipprVipBot = createEquipprVipBot(configuration);
  await startEquipprVipBot();
}

main();
