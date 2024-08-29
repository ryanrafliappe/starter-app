import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { WebResponse } from '../model/web.model';
import { Role } from '../database/entities/role.entity';
import { CONSTANTS } from '../common/constants';
import { CreateRoleDto, RoleResponseDto, UpdateRoleDto } from './role.dto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    @HttpCode(200)
    async findAll(): Promise<WebResponse<RoleResponseDto[]>> {
        const roles = await this.roleService.findAll();

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: roles
        }
    }

    @Get('with-permissions')
    @HttpCode(200)
    async findAllWithPermissions(): Promise<WebResponse<RoleResponseDto[]>> {
        const roles = await this.roleService.findAllWithPermissions();

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: roles
        }
    }

    @Get(':id')
    @HttpCode(200)
    async find(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<RoleResponseDto>> {
        const role = await this.roleService.find(id);
        
        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: role
        }
    }

    @Get(':id/with-permissions')
    @HttpCode(200)
    async findWithPermissions(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<RoleResponseDto>> {
        const role = await this.roleService.findWithPermissions(id);

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: role
        }
    }

    @Post()
    @HttpCode(201)
    async create(
        @Body() createRoleDto: CreateRoleDto
    ): Promise<WebResponse<RoleResponseDto>> {
        const role = await this.roleService.create(createRoleDto);

        return {
            statusCode: 201,
            success: true,
            message: CONSTANTS.success.create,
            data: role
        }
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<WebResponse<RoleResponseDto>> {
        const result = await this.roleService.update(id, updateRoleDto);

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.update,
            data: result,
        }
    }

    @Delete(':id/detach-permissions')
    @HttpCode(200)
    async detach(
        @Param('id', ParseIntPipe) id: number
    ): Promise<WebResponse<RoleResponseDto>> {
        await this.roleService.detach(id);

        return {
            statusCode: 200,
            success: true,
            message: 'Permissions detached successfully.'
        }
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<WebResponse<string>> {
        await this.roleService.delete(id);

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.delete
        }
    }
}
