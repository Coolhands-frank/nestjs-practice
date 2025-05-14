import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsString()
    @IsOptional()
    displayName?: string;
}