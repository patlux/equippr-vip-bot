/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { lightFormat } from 'date-fns';
import chalk from 'chalk';

const nowStr = () => {
  return lightFormat(new Date(), 'MM-dd HH:mm:ss-SSSS');
};

type CLog = Parameters<typeof console.log>;
type CWarn = Parameters<typeof console.warn>;
type CErr = Parameters<typeof console.error>;

export interface Logger {
  log: typeof console.log;
  warn: typeof console.warn;
  err: typeof console.error;
}

export const log = (...args: CLog) =>
  console.log(chalk.gray(nowStr()), chalk.green('info'), ...args);
export const warn = (...args: CWarn) =>
  console.log(chalk.gray(nowStr()), chalk.yellowBright('warn'), ...args);
export const err = (...args: CErr) =>
  console.log(chalk.gray(nowStr()), chalk.redBright('err '), ...args);

// eslint-disable-next-line
const noop = (..._args: unknown[]) => {};
export const NoopLogger: Logger = { log: noop, warn: noop, err: noop };

export default function createLogger(prefix: string) {
  return {
    log: (...args: CLog) => log(prefix, ...args),
    warn: (...args: CWarn) => warn(prefix, ...args),
    err: (...args: CErr) => err(prefix, ...args),
  };
}
