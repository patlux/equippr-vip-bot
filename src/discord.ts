import camelcase from 'camelcase';
import type { Client } from 'discord.js';
import { MessageMentions } from 'discord.js';

import { assert } from './assert';

export interface MessageEmbedLight {
  type: string | 'rich';
  title: string | null;
  author: { name?: string } | null;
  fields?: Array<{ name: string; value: string; inline?: boolean }>;
}

export interface MessageLight {
  id: string;
  channelId: string;
  cleanContent: string;
  embeds?: MessageEmbedLight[];
}

export function getEmbedsFields(embed: MessageEmbedLight): Record<string, string> {
  if (!Array.isArray(embed.fields)) {
    return {};
  }
  return embed.fields.reduce((acc, field) => {
    return {
      ...acc,
      [camelcase(field.name.trim())]: field.value,
    };
  }, {});
}

export function getUserMentionsFromMessage(msg: string): string[] {
  const mentions = msg.match(MessageMentions.USERS_PATTERN);
  if (mentions == null) {
    return [];
  }
  return mentions.map((mention) => {
    // <@302145365640216577>
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      return mention.substr(2).slice(0, -1);
    }
    return mention;
  });
}

export async function sendMessage(client: Client, channelId: string, msg: string): Promise<void> {
  const channel = client.channels.cache.get(channelId);
  assert(channel, 'Channel not found');
  // eslint-disable-next-line
  // @ts-ignore
  await channel.send(msg);
}
