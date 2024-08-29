import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '../database/entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
