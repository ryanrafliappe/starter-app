import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "./auth.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { User } from "../database/entities/user.entity";
import { Role } from "../database/entities/role.entity";
import { Permission } from "../database/entities/permission.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1sampai8',
            database: 'nestjs_starter_db',
            entities: [User, Role, Permission],
            synchronize: true, // just for development, not production
            logging: true,
        }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'ZXNfcGlzYW5nX2lqbw==',
            signOptions: { expiresIn: '60s' }
        }),
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers: [],
    exports: [JwtModule]
})
export class CommonModule implements NestModule {
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('/api/*');
    }
}