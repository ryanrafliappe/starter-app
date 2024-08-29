import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'es_pisang_ijo',
            signOptions: { expiresIn: '60m' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
