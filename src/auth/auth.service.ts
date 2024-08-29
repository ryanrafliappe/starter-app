import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthLoginDto, AuthResponseDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(authLoginDto: AuthLoginDto): Promise<any> {
        const user = await this.userService.findByEmail(authLoginDto.email);

        if (user && await bcrypt.compare(authLoginDto.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: User): Promise<AuthResponseDto> {
        const payload = { email: user.email, sub: user.id };
        const jwt = this.jwtService.sign(payload);

        await this.userService.updateToken(user.id, jwt);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role?.name ?? null,
            token: jwt
        };
    }

    async logout(id: string): Promise<void> {
        await this.userService.updateToken(id, null)
    }
}
