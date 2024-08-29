import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from '../database/entities/permission.entity';
import { WebResponse } from '../model/web.model';
import { CONSTANTS } from '../common/constants';
import { PermissionRequestDto, PermissionResponseDto } from './permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get('all')
    @HttpCode(200)
    async getAll(): Promise<WebResponse<PermissionResponseDto[]>> {
        const permissions = await this.permissionService.getAll();

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: permissions
        }
    }

    @Get(':id')
    @HttpCode(200)
    async get(
        @Param('id', ParseIntPipe) id: number
    ): Promise<WebResponse<PermissionResponseDto>> {
        const permission = await this.permissionService.get(id);

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: permission
        }
    }

    @Post()
    @HttpCode(201)
    async create(
        @Body() permissionRequestDto: PermissionRequestDto,
    ): Promise<WebResponse<PermissionResponseDto>> {
        const result = await this.permissionService.create(permissionRequestDto);
        return {
            statusCode: 201,
            success: true,
            message: CONSTANTS.success.create,
            data: result
        }
    } 

    @Put(':id')
    @HttpCode(200)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() permissionRequestDto: PermissionRequestDto
    ): Promise<WebResponse<PermissionResponseDto>> {
        const result = await this.permissionService.update(id, permissionRequestDto);

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.update,
            data: result
        }
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<WebResponse<string>> {
        const result = await this.permissionService.delete(id);

        return {
            statusCode: 200,
            success: true,
            message: `Permission with name '${result}' deleted successfully.`
        }
    }
}
