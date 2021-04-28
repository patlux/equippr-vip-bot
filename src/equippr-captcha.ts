import type { Message } from 'discord.js';
import mathjs from 'mathjs';

import { assert } from './assert';
import { sendMessage } from './discord';
import type { CreateHandler } from './equippr-bot';
import { warn } from './logger';
import { randomNumber, sleep } from './utils';

export function getAnswer(txt: string): string {
  const mathExpressionMatches = txt.match(/(\d+\s*(\*|\/|\+|-)\s*)+(\d+\s*)/gi);
  assert(mathExpressionMatches && mathExpressionMatches.length >= 1, 'No math expression found');
  const mathExpression = mathExpressionMatches[0];
  return mathjs.evaluate(mathExpression) + '';
}

const createHandlerForCaptcha: CreateHandler = ({ client, conf }) => {
  return async (msg: Message) => {
    try {
      // TESTING PURPOSE
      if (conf.adminUsernames.includes(msg.author.username)) {
        if (msg.cleanContent.includes('Captcha')) {
          const answer = getAnswer(msg.cleanContent);
          await sendMessage(client, conf.channelId, `!solve ${answer}`);
        }
      }

      const isEquipprBot = msg.author.bot;
      const isPrivateMsg = msg.channel.type === 'dm';

      if (!isEquipprBot || !isPrivateMsg) {
        return;
      }

      const embed = msg.embeds.length > 0 ? msg.embeds[0] : null;

      if (embed == null) {
        return;
      }

      if (!embed.title?.includes('Captcha')) {
        return;
      }

      if (embed.description == null) {
        return;
      }

      const answer = getAnswer(embed.description);
      await sleep(randomNumber(5000, 30000));
      await sendMessage(client, conf.channelId, `!solve ${answer}`);
    } catch (error) {
      warn(`Error in captcha:`, error.message);
    }
  };
};

export default createHandlerForCaptcha;
