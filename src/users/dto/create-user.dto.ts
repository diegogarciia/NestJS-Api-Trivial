import { IsEmail, IsInt, IsString } from "class-validator";

export class CreateUserDto {

    @IsInt()
    id: number;

    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}