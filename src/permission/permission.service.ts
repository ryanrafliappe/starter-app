import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../database/entities/permission.entity';
import { CONSTANTS } from '../common/constants';
import { PermissionRequestDto, PermissionResponseDto } from './permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {}

    async getAll(): Promise<PermissionResponseDto[]> {
        const permissions = await this.permissionRepository.find({
            select: ['id', 'name']
        });
        
        return permissions;
    }

    async get(id: number): Promise<PermissionResponseDto> {
        const permission = await this.permissionRepository.findOne({
            where: { id },
            select: ['id', 'name']
        });

        if (permission == null) {
            throw new HttpException(CONSTANTS.error.notFound, 404);
        }

        return permission;
    }

    async create(permissionRequestDto: PermissionRequestDto): Promise<PermissionResponseDto>
    {
        const [ value, count ] = await this.permissionRepository.findAndCountBy({name: permissionRequestDto.name});
        if (count > 0) {
            throw new HttpException(CONSTANTS.error.duplicate, 400);
        }

        const permission = new Permission();
        permission.name = permissionRequestDto.name;

        const result = await this.permissionRepository.save(permission);

        return {
            id: result.id,
            name: result.name
        };
    }

    async update(id: number, permissionRequestDto: PermissionRequestDto): Promise<PermissionResponseDto> {
        const permission = await this.permissionRepository.findOneBy({ id });

        if (!permission) {
            throw new HttpException('Permission not found.', 404);
        }

        Object.assign(permission, permissionRequestDto);
        const result = await this.permissionRepository.save(permission);

        return {
            id: result.id,
            name: result.name
        }
    }

    async delete(id: number): Promise<string> {
        const permission = await this.permissionRepository.findOneBy({ id });

        if (!permission) {
            throw new HttpException('Permission not found.', 404);
        }
        
        const tempName = permission.name;

        await this.permissionRepository.delete(id);
        return tempName;

    }
}
