import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [DomainModule, ConfigModule],
})
export class AppModule {}
