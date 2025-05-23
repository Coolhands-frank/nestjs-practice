import {IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}