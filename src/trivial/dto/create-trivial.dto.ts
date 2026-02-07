import { IsInt, IsString, IsArray, ArrayNotEmpty, ArrayUnique, IsOptional } from "class-validator";

export class CreateTrivialDto {
  @IsInt()
  id: number;

  @IsString()
  pregunta: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  opciones: string[];

  @IsOptional() 
  @IsString()
  respuesta?: string;

  @IsString()
  respuestaCorrecta: string;

  @IsString() 
  dificultad: string;
}