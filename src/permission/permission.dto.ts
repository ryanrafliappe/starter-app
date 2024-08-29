import { IsNotEmpty, IsString } from "class-validator";

export class PermissionResponseDto {
    id: number;
    name: string;
}

export class PermissionRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}