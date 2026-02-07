import { IsEmail, IsInt, IsString, IsArray, ArrayNotEmpty, ArrayUnique, IsOptional, IsNumber } from "class-validator";

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles: string[];

  @IsOptional()
  @IsNumber()
  aciertos?: number;

  @IsOptional()
  @IsNumber()
  preguntasRespondidas?: number;
}