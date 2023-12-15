import { Injectable } from '@nestjs/common';
import { Logger as TypeORMLogger } from 'typeorm';
import { Logger } from '@nestjs/common';

/**
 * Provides a wrapper around the logger for TypeORM.
 */
@Injectable()
export class DbLogger implements TypeORMLogger {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private stringifyQuery(query: string, parameters?: any[]) {
    const parametersStr = parameters ? ` (${JSON.stringify(parameters)})` : '';
    return `${query}${parametersStr}`;
  }

  public logQuery(query: string, parameters?: any[]): void {
    Logger.debug(`DB: ${this.stringifyQuery(query, parameters)}`);
  }
  public logQueryError(error: string, query: string, parameters?: any[]) {
    Logger.error(`DB: ${error} - ${this.stringifyQuery(query, parameters)}`);
  }
  public logQuerySlow(time: number, query: string, parameters?: any[]) {
    Logger.warn(
      `DB: SLOW (${time}) - ${this.stringifyQuery(query, parameters)}`,
    );
  }
  public logSchemaBuild(message: string) {
    Logger.log(`DB: ${message}`);
  }
  public logMigration(message: string) {
    Logger.log(`DB: ${message}`);
  }
  public log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
      case 'info':
        Logger.log(`${message}`);
        break;
      case 'warn':
        Logger.warn(`${message}`);
        break;
      default:
        Logger.debug(`${message}`);
        break;
    }
  }
}
