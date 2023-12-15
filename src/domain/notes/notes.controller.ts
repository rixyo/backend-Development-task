import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NoteService } from './notes.service';
import { NoteEntity } from './entity/note.entity';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { Logger } from '@nestjs/common';

@Controller('notes')
export class NoteCroller {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(@Body() body: CreateNoteDto): Promise<NoteEntity> {
    Logger.log(`Creating Note: ${JSON.stringify(body)}`);
    return this.noteService.createNote(body);
  }
  @Get()
  async getNotes(@Query('page') page = 1): Promise<any> {
    return this.noteService.getNotes(page);
  }
  @Get(':id')
  async getNoteById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<NoteEntity> {
    return this.noteService.getNoteById(id);
  }
  @Patch(':id')
  async updateNote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateNoteDto,
  ): Promise<NoteEntity> {
    return this.noteService.updateNoteById(id, body);
  }
  @Delete(':id')
  async deleteNoteById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    return this.noteService.deleteNoteById(id);
  }
}
