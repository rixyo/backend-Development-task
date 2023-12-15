import { DataSource } from 'typeorm';
import { NoteEntity } from 'src/domain/notes/entity/note.entity';

export default new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [NoteEntity],
  migrations: ['migrations/**'],
});
