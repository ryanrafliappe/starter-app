import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
