import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/database/entities/role.entity";

export class UserResponseDto {
    id: string;
    name: string;
    email?: string;
    token?: string;
    role?: string|Role;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, {message: ' Invalid email address'})
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: ' Minimum input for password is $constraint1 character'})
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsEmail({}, {message: 'Invalid email address'})
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    role?: string;
}

export class UpdateUserPasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: ' Minimum input for password is $constraint1 character'})
    password: string;
}