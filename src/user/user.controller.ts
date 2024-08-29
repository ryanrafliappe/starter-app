import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../model/web.model';
import { CONSTANTS } from '../common/constants';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto, UserResponseDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @HttpCode(200)
    async findAll(): Promise<WebResponse<UserResponseDto[]>> {
        const users = await this.userService.findAll();

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: users
        }
    }

    @Get(':id')
    @HttpCode(200)
    async find(
        @Param('id') id: string
    ): Promise<WebResponse<UserResponseDto>> {
        const user = await this.userService.find(id);

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.retrieve,
            data: user
        }
    }

    @Post()
    @HttpCode(201)
    async create(
        @Body() createUserDto: CreateUserDto
    ): Promise<WebResponse<UserResponseDto>> {
        const user = await this.userService.create(createUserDto);

        return {
            statusCode: 201,
            success: true,
            message: CONSTANTS.success.create,
            data: user
        }
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<WebResponse<UserResponseDto>> {
        const result = await this.userService.update(id, updateUserDto);

        return {
            statusCode: 200,
            success: true,
            message: CONSTANTS.success.update,
            data: result
        }
    }

    @Put(':id/change-password')
    @HttpCode(200)
    async updatePassword(
        @Param('id') id: string,
        @Body() updateUserPasswordDto: UpdateUserPasswordDto
    ): Promise<WebResponse<UserResponseDto>> {
        const user = await this.userService.updatePassword(id, updateUserPasswordDto);

        return {
            statusCode: 200,
            success: true,
            message: 'Password changed successfully.',
            data: user
        }
    }

    @Delete(':id/detach-role')
    @HttpCode(200)
    async detach(
        @Param('id') id: string
    ): Promise<WebResponse<UserResponseDto>> {
        const user = await this.userService.detach(id);

        return {
            statusCode: 200,
            success: true,
            message: 'Role detached successfully.',
            data: user,
        }
    }

    @Delete(":id")
    @HttpCode(200)
    async delete(
        @Param('id') id: string
    ): Promise<WebResponse<string>> {
        const user = await this.userService.delete(id);

        return {
            statusCode: 200,
            success: true,
            message: 'User deleted successfully.',
            data: user
        }
    }
}
