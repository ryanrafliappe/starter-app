import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../database/entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Permission } from '../database/entities/permission.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, Permission]),
    ],
    providers: [RoleService],
    controllers: [RoleController],
})
export class RoleModule {}
