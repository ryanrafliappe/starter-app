import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        PassportModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
