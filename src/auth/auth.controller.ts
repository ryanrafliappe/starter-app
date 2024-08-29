import { Body, Controller, HttpCode, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthLogoutDto, AuthResponseDto } from './auth.dto';
import { WebResponse } from '../model/web.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body() authLoginDto: AuthLoginDto
    ): Promise<WebResponse<AuthResponseDto>> {
        const user = await this.authService.validateUser(authLoginDto);

        if (!user) {
            throw new HttpException('Invalid credentials', 401);
        }

        const auth = await this.authService.login(user);

        return {
            statusCode: 200,
            success: true,
            message: 'user login successfully.',
            data: auth
        }
    }

    @Post('logout')
    async logout(
        @Body() authLogoutDto: AuthLogoutDto
    ): Promise<WebResponse<string>> {
        await this.authService.logout(authLogoutDto.id);

        return {
            statusCode: 200,
            success: false,
            message: 'User logout successfully',
        }
    }
}
