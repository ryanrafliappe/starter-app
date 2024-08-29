import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PermissionResponseDto } from "../permission/permission.dto";

export class RoleResponseDto {
    id: number;
    name: string;
    permissions?: PermissionResponseDto[];
}

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsArray()
    @Type(() => String)
    permissions: string[];
}

export class UpdateRoleDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    permissions?: string[];
}