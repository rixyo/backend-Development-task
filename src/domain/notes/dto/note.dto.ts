import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  content: string;
}
export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title?: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  content?: string;
}
