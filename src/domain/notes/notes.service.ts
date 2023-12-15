import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './entity/note.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UpdateNoteDto } from './dto/note.dto';

interface CreateNote {
  title: string;
  content: string;
}

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}
  async createNote(createNote: CreateNote): Promise<NoteEntity> {
    const saveEntity = {
      ...createNote,
    };
    const userEntity = this.noteRepository.create(saveEntity);
    let note: NoteEntity;
    try {
      note = await this.noteRepository.save(userEntity);
    } catch (error) {
      Logger.log(`Error creating Note: ${JSON.stringify(error)}`);
    }
    Logger.log(`User created: id:${note.id}`);
    return note;
  }
  async getNotes(page: number): Promise<any> {
    const query = this.noteRepository.createQueryBuilder('note');
    query.orderBy('note.created_at', 'DESC');
    query.skip(10 * (page - 1));
    query.take(10);
    const notes = await query.getMany();

    const notesCount = await this.noteRepository.count();
    const totalPages = Math.ceil(notesCount / 10);
    Logger.log(`Notes retrieved: ${notes.length} of ${notesCount} total notes`);
    return {
      notes,
      totalPages,
      perPage: 10,
    };
  }
  async getNoteById(id: string): Promise<NoteEntity> {
    const note = await this.noteRepository.findOne({
      where: {
        id,
      },
    });
    Logger.log(`Note retrieved: ${JSON.stringify(note)}`);
    return note ;
  }
  async updateNoteById(
    id: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<NoteEntity> {
    const note = await this.getNoteById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    if (updateNoteDto.title !== undefined) {
      note.title = updateNoteDto.title;
    }

    if (updateNoteDto.content !== undefined) {
      note.content = updateNoteDto.content;
    }
    await note.save();
    Logger.log(`Note updated: ${JSON.stringify(note)}`);
    return note;
  }
  async deleteNoteById(id: string): Promise<string> {
    const note = await this.getNoteById(id);
    if (!note) {
      throw new Error('Note not found');
    }
    await note.remove();
    Logger.log(`Note deleted: ${JSON.stringify(note)}`);
    return `Note with id: ${id} deleted`;
  }
}
