import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { DbModule } from '../../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './entity/note.entity';
import { NoteService } from './notes.service';
import { NoteCroller } from './notes.controller';

@Module({
  imports: [ConfigModule, DbModule, TypeOrmModule.forFeature([NoteEntity])],
  providers: [NoteService],
  controllers: [NoteCroller],
  exports: [],
})
export class NoteModule {}
