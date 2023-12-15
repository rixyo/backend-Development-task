import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DbModule } from '../db/db.module';
import { NoteModule } from './notes/notes.module';
import { NoteEntity } from './notes/entity/note.entity';

@Module({
  imports: [
    ConfigModule,
    DbModule.forRoot({
      entities: [NoteEntity],
    }),
    NoteModule,
  ],
})
export class DomainModule {}
