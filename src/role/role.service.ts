import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from '../common/constants';
import { In, Repository } from 'typeorm';
import { CreateRoleDto, RoleResponseDto, UpdateRoleDto } from './role.dto';
import { Role } from 'src/database/entities/role.entity';
import { Permission } from 'src/database/entities/permission.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    ) {}

    async findAll(): Promise<RoleResponseDto[]> {
        return await this.roleRepository.find({
            select: ['id', 'name'],
        });
    }

    async findAllWithPermissions(): Promise<RoleResponseDto[]> {
        return await this.roleRepository.createQueryBuilder('role')
            .leftJoinAndSelect('role.permissions', 'permissions')
            .select(['role.id', 'role.name', 'permissions.id', 'permissions.name'])
            .getMany();
    }

    async find(id: number): Promise<RoleResponseDto> {
        const role = await this.roleRepository.findOne({
            where: { id },
            select: ['id', 'name']
        });

        if (!role) {
            throw new HttpException(CONSTANTS.error.notFound, 404);
        }

        return role;
    }

    async findWithPermissions(id: number): Promise<RoleResponseDto> {
        return await this.roleRepository.createQueryBuilder('roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where({'id': id })
            .select(['roles.id', 'roles.name', 'permissions.id', 'permissions.name'])
            .getOne();
    }

    async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
        const { name, permissions } = createRoleDto;

        const [ value, count ] = await this.roleRepository.findAndCountBy({ name: name });
        if (count > 0) {
            throw new HttpException(CONSTANTS.error.duplicate, 400);
        }

        let permissionsSets = [];
        if (permissions && permissions.length > 0) {
            permissionsSets = await this.permissionRepository.find({
                where: permissions.map(permissions => ({ name: permissions }))
            });
        }

        const role = this.roleRepository.create({ name: name, permissions: permissionsSets });

        const result =  await this.roleRepository.save(role);

        return {
            id: result.id,
            name: result.name
        }
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleResponseDto> {
        const { name, permissions } = updateRoleDto;

        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions']
        });

        if (!role) {
            throw new HttpException(CONSTANTS.error.notFound, 404);
        }

        if (name) {
            role.name = name;
        }

        if (permissions) {
            const permissionSets = await this.permissionRepository.findBy({
                name: In(permissions),
            });

            role.permissions = permissionSets;
        }

        const result = await this.roleRepository.save(role);

        return {
            id: result.id,
            name: result.name
        }
    }

    async detach(id: number): Promise<RoleResponseDto> {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions']
        });

        if (!role) {
            throw new HttpException(CONSTANTS.error.notFound, 404);
        }

        role.permissions = [];
        await this.roleRepository.save(role);

        return role;
    }

    async delete(id: number): Promise<void> {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions']
        });

        if (!role) {
            throw new HttpException(CONSTANTS.error.notFound, 404);
        }

        role.permissions = [];
        await this.roleRepository.save(role);

        await this.roleRepository.delete(id);
    }
}
