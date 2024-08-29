import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Role } from '../database/entities/role.entity';
import { Repository } from 'typeorm';
import { CONSTANTS } from '../common/constants';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto, UserResponseDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {}

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .select(['user.id', 'user.name', 'user.email', 'role.name'])
            .getMany();

        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            token: user.token,
            role: user.role?.name ?? null
        }));
    }

    async find(id: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['role']
        });

        if (!user) {
            throw new HttpException('User not found.', 404);
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role?.name ?? null
        }
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email: email },
            relations: ['role']
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const [ value, count ] = await this.userRepository.findAndCountBy({ email: createUserDto.email });

        if (count > 0) {
            throw new HttpException(CONSTANTS.error.duplicate, 409);
        }

        const role = await this.roleRepository.findOneBy({ name: createUserDto.role});

        const user = this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: await bcrypt.hash(createUserDto.password, 10),
            role: role
        });

        const result = await this.userRepository.save(user);

        return {
            id: result.id,
            name: result.name,
            email: result.email,
            role: result.role.name
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['role']
        });

        if (!user) {
            throw new HttpException(CONSTANTS.error.notFound, 404);
        }

        if (updateUserDto.name) {
            user.name = updateUserDto.name;
        }

        if (updateUserDto.email) {
            user.email = updateUserDto.email;

            // nanti harusnya ada proses kirim email disini
        }

        if (updateUserDto.role) {
            const role = await this.roleRepository.findOne({
                where: {
                    name: updateUserDto.role
                }
            });

            if (!role) {
                throw new HttpException('Role not found.', 404);
            }

            user.role = role;
        }

        const result = await this.userRepository.save(user);

        return {
            id: result.id,
            name: result.name,
            email: result.email,
            role: result.role.name
        }
    }

    async updatePassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            throw new HttpException('User not found.', 404);
        }

        user.password = await bcrypt.hash(updateUserPasswordDto.password, 10);
        const result = await this.userRepository.save(user);

        return {
            id: result.id,
            name: result.name
        }
    }

    async updateToken(id: string, token: string|null): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        
        if (!user) {
            throw new HttpException('User not found.', 404);
        }

        user.token = token ?? null;
        await this.userRepository.save(user);
    }

    async detach(id: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
            throw new HttpException('User not found.', 404);
        }

        user.role = null;
        await this.userRepository.save(user);

        return {
            id: user.id,
            name: user.name
        };
    }

    async delete(id: string): Promise<string> {
        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
            throw new HttpException('User not found.', 404);
        }

        const nameTemp = user.name;

        await this.userRepository.softRemove(user);

        return nameTemp;
    }
}
