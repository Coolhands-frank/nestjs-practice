import { IsOptional, IsString, IsEmail } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string;
}