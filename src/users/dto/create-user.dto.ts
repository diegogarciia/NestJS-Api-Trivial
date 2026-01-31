import { IsEmail, IsInt, IsString, IsArray, ArrayNotEmpty, ArrayUnique } from "class-validator";

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
    @ArrayUnique()          
    @IsString({ each: true }) 
    roles?: string[];

}