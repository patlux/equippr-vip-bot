import chalk from 'chalk';
import type { Message } from 'discord.js';

import { getEmbedsFields, getUserMentionsFromMessage } from './discord';
import type { CreateHandler } from './equippr-bot';

import { log } from './logger';

const createHandlerForOutput: CreateHandler = ({ client, conf }) => {
  return (msg: Message) => {
    const isMe = msg.author.username === client.user?.username;
    const isEquipprBot = msg.author.bot;

    if (isMe || conf.usernamesOutput.includes(msg.author.username)) {
      log(chalk`{gray ${msg.author.username}} :: ${msg.cleanContent}`);
    }

    if (!isEquipprBot) {
      return;
    }

    msg.embeds?.forEach((embed) => {
      const mentions = getUserMentionsFromMessage(embed.description || '');
      if (client.user && mentions.includes(client.user.id)) {
        log(chalk`{gray ${msg.author.username}} :: ${embed.description}`);

        if (embed.fields.length > 0) {
          const fields = getEmbedsFields(embed);
          const fieldsHumanized = Object.keys(fields).reduce((acc, fieldKey) => {
            return `${acc}, ${fieldKey}: ${fields[fieldKey]}`;
          }, '');
          log(fieldsHumanized);
        }
      }
    });
  };
};

export default createHandlerForOutput;
