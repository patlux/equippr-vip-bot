import Discord from 'discord.js';
import type { Client } from 'discord.js';
import chalk from 'chalk';

import { assert } from './assert';
import { randomNumber } from './utils';
import createLogger from './logger';
import { getUserMentionsFromMessage } from './discord';

const { log, warn } = createLogger('equippr');

export interface EquipprVipBotOptions {
  tokens: string[];
  channelId: string;
  minWaitTimeMine: number;
  maxWaitTimeMine: number;
  minWaitTimeFlip: number;
  maxWaitTimeFlip: number;
  minWaitTimeSearch: number;
  maxWaitTimeSearch: number;
}

async function sendMessage(client: Client, channelId: string, msg: string): Promise<void> {
  const channel = client.channels.cache.get(channelId);
  assert(channel, 'Channel not found');
  // @ts-ignore
  await channel.send(msg);
}

function createEquipprVipBot(conf: EquipprVipBotOptions) {
  // @ts-ignore
  const client = new Discord.Client({ _tokenType: '' });

  client.on('ready', () => {
    log(chalk`Ready. Logged in as {blue ${client.user?.tag}} {gray (${client.user?.id}) }!`);
  });

  const token = conf.tokens[0];

  const startBot = async () => {
    log('Login...');
    await client.login(token);
    log('Login successful. Waiting to be ready..');

    client.on('message', (msg) => {
      if (msg.channel.id !== conf.channelId) {
        return;
      }

      const isMe = msg.author.username === client.user?.username;
      const isEquipprBot = msg.author.username === 'equippr';

      if (isMe) {
        log(chalk`{gray ${msg.author.username}} :: ${msg.cleanContent}`);
      }

      const embed = msg.embeds.length > 0 ? msg.embeds[0] : null;
      if (isEquipprBot && embed != null) {
        const mentions = getUserMentionsFromMessage(embed.description || '');
        if (client.user && mentions.includes(client.user.id)) {
          log(chalk`{gray ${msg.author.username}} :: ${embed.description}`);
        }
      }
    });

    async function sendMine() {
      try {
        await sendMessage(client, conf.channelId, '!mine');
      } catch (error) {
        warn('Error while sendMine():', error);
      }
    }

    async function sendFlip() {
      try {
        await sendMessage(client, conf.channelId, '!coinflip kopf 100');
      } catch (error) {
        warn('Error while sendFlip():', error);
      }
    }

    async function sendSearch() {
      try {
        await sendMessage(client, conf.channelId, '!search');
      } catch (error) {
        warn('Error while sendFlip():', error);
      }
    }

    await sendMine();

    setInterval(() => {
      sendMine();
    }, randomNumber(conf.minWaitTimeMine, conf.maxWaitTimeMine));

    setInterval(() => {
      sendFlip();
    }, randomNumber(conf.minWaitTimeFlip, conf.maxWaitTimeFlip));

    setInterval(() => {
      sendSearch();
    }, randomNumber(conf.minWaitTimeSearch, conf.maxWaitTimeSearch));
  };

  return startBot;
}

export default createEquipprVipBot;
