import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigDBData } from '../config/config.interface';
import { ConfigService } from '../config/config.service';

import { DbConfigError } from './db.errors';
import { DbConfig } from './db.interface';
@Module({})
export class DbModule {
  private static getConnectionOptions(
    config: ConfigService,
    dbconfig: DbConfig,
  ): TypeOrmModuleOptions {
    const dbdata = config.get().db;
    if (!dbdata) {
      throw new DbConfigError('Database config is missing');
    }
    const connectionOptions = DbModule.getConnectionOptionsMySql(dbdata);
    return {
      ...connectionOptions,
      entities: dbconfig.entities,
      synchronize: true,
      logging: false,
      migrations: [__dirname + '/path/to/migration/*.js'], // Adjust the path accordingly
    };
  }

  private static getConnectionOptionsMySql(
    dbdata: ConfigDBData,
  ): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      url: dbdata.url,
      keepConnectionAlive: true,
      ssl:
        process.env.NODE_ENV !== 'development' &&
        process.env.NODE_ENV !== 'test'
          ? { rejectUnauthorized: false }
          : false,
    };
  }
  public static forRoot(dbconfig: DbConfig): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useFactory: (configService: ConfigService) =>
            DbModule.getConnectionOptions(configService, dbconfig),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
