import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../database/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async use(req: any, res: any, next: (error?: any) => void) {
        const token = req.headers['authorization']?.split(' ')[1];
        
        if (token) {
            let payload;
            try {
                payload = await this.jwtService.verifyAsync(token);
            } catch (error) {
                throw new HttpException(`Unauthorized. ${error.message}`, 401);
            }
            const user = await this.userRepository.findOne({
                where: { id: payload.id }
            })

            if (user) {
                req.user = user;
            }

            next();
        } else {
            throw new HttpException('Unauthorized', 401);
        }
    }
}