import { IsEmail, IsInt, IsString } from "class-validator";

export class CreateUserDto {

    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}
