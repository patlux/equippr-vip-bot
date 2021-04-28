import type { Client, Message } from 'discord.js';

export interface EquipprVipBotOptions {
  tokens: string[];
  channelId: string;
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

export interface BotExecutor {
  (): Promise<void>;
}

export interface Context {
  client: Client;
  conf: EquipprVipBotOptions;
}

export interface CreateHandler<T = void> {
  (ctx: Context): (msg: Message) => T | Promise<T>;
}
