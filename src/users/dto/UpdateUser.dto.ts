import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    userName?: string;

    @IsString()
    @IsOptional()
    displayName?: string;
}