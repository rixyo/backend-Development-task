import { ConfigData } from './config.interface';

// tslint:disable:no-hardcoded-credentials

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  db: {
    url: process.env.DATABASE_URL,
  },
  debug: 'qapi:*',
  port: 3000,
  logLevel: 'info',
  newRelicKey: '',
};
