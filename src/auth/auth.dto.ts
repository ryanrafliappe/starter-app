import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthResponseDto {
    id: string;
    name: string;
    email: string;
    role?: string;
    token: string;
}

export class AuthLoginDto {
    @IsEmail({}, {message: ' Invalid email address'})
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, {message: ' Minimum input for password is $constraint1 character'})
    @IsNotEmpty()
    password: string
}

export class AuthLogoutDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}