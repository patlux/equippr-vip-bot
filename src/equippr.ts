import Discord from 'discord.js';
import chalk from 'chalk';

import { randomNumber, sleep } from './utils';
import createLogger from './logger';
import { sendMessage } from './discord';
import { createFlipper } from './equippr-miner';
import createEquipprOutputHandler from './equippr-output';
import createEquipprCaptchaHandler from './equippr-captcha';
import type { EquipprVipBotOptions, BotExecutor } from './equippr-bot';

const { log, warn } = createLogger('equippr');

function createEquipprVipBot(conf: EquipprVipBotOptions): BotExecutor {
  const getFlip = createFlipper(conf.flipStyle);

  // eslint-disable-next-line
  // @ts-ignore
  const client = new Discord.Client({ _tokenType: '' });

  const token = conf.tokens[0];
  const equipprOutput = createEquipprOutputHandler({ client, conf });
  const equipprCaptcha = createEquipprCaptchaHandler({ client, conf });

  const startBot = async () => {
    log('Login...');
    await client.login(token);
    log('Login successful. Waiting to be ready..');

    client.on('message', (msg) => {
      try {
        equipprCaptcha(msg);

        if (msg.channel.id !== conf.channelId) {
          return;
        }

        equipprOutput(msg);
      } catch (error) {
        warn(`Error while message:`, error.message);
      }
    });

    async function sendStats() {
      try {
        await sendMessage(client, conf.channelId, '!account');
      } catch (error) {
        warn('Error while sendStats():', error);
      }
    }

    async function sendMine() {
      try {
        await sendMessage(client, conf.channelId, '!mine');
      } catch (error) {
        warn('Error while sendMine():', error);
      }
    }

    async function sendFlip() {
      try {
        await sendMessage(client, conf.channelId, '!coinflip ' + getFlip() + ' 100');
      } catch (error) {
        warn('Error while sendFlip():', error);
      }
    }

    async function sendSearch() {
      try {
        await sendMessage(client, conf.channelId, '!search');
      } catch (error) {
        warn('Error while sendSearch():', error);
      }
    }

    client.on('ready', async () => {
      log(chalk`Ready. Logged in as {blue ${client.user?.tag}} {gray (${client.user?.id}) }!`);
      sendStats();
      await sleep(randomNumber(500, 1500));
      sendMine();
    });

    if (conf.minWaitTimeMine > 0) {
      setInterval(() => {
        sendMine();
      }, randomNumber(conf.minWaitTimeMine, conf.maxWaitTimeMine));
    }

    if (conf.minWaitTimeSearch > 0) {
      setInterval(() => {
        sendSearch();
      }, randomNumber(conf.minWaitTimeSearch, conf.maxWaitTimeSearch));
    }
    if (conf.minWaitTimeFlip > 0) {
      setInterval(() => {
        sendFlip();
      }, randomNumber(conf.minWaitTimeFlip, conf.maxWaitTimeFlip));
    }

    if (conf.minWaitTimeStats > 0) {
      setInterval(() => {
        sendStats();
      }, randomNumber(conf.minWaitTimeStats, conf.maxWaitTimeStats));
    }
  };

  return startBot;
}

export default createEquipprVipBot;
