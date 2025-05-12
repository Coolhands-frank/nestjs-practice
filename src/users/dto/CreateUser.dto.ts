import { IsOptional, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string;
}