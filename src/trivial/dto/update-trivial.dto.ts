import { PartialType } from '@nestjs/mapped-types';
import { CreateTrivialDto } from './create-trivial.dto';
import {
  IsOptional,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class UpdateTrivialDto extends PartialType(CreateTrivialDto) {

  @IsOptional()
  @IsString()
  pregunta: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  opciones: string[];

  @IsOptional()
  @IsString()
  respuesta?: string;

  @IsOptional()
  @IsString()
  respuestaCorrecta: string;

}