import { IsOptional, IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    displayName?: string;
}