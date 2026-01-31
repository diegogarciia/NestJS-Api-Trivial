import { IsInt, IsString, IsArray, ArrayNotEmpty, ArrayUnique } from "class-validator";

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

    @IsString()
    respuesta?: string;
          
    @IsString() 
    respuestaCorrecta: string;

}