import { getAppEnv } from '@/lib/env';

type LogMethod = (...args: unknown[]) => void;

function shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
  const env = getAppEnv();
  if (env === 'production') return level === 'warn' || level === 'error';
  return true;
}

function withPrefix(method: LogMethod, level: string): LogMethod {
  return (...args: unknown[]) => {
    method(`[${level}]`, ...args);
  };
}

export const logger = {
  debug: withPrefix((...args) => {
    if (!shouldLog('debug')) return;
    // eslint-disable-next-line no-console
    console.debug(...args);
  }, 'debug'),
  info: withPrefix((...args) => {
    if (!shouldLog('info')) return;
    // eslint-disable-next-line no-console
    console.info(...args);
  }, 'info'),
  warn: withPrefix((...args) => {
    if (!shouldLog('warn')) return;
    // eslint-disable-next-line no-console
    console.warn(...args);
  }, 'warn'),
  error: withPrefix((...args) => {
    if (!shouldLog('error')) return;
    // eslint-disable-next-line no-console
    console.error(...args);
  }, 'error'),
};
