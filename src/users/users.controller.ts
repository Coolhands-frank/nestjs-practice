import { Controller, Post, Body, Get, Param, HttpException, Patch } from '@nestjs/common'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
    
    
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const generatedId = await this.usersService.createUser(createUserDto);
        return { message: "user added successfully", id: generatedId }
    }

    @Get()
    async getUsers() {
        const users = await this.usersService.getUsers()
        return { message: "All users retrieved successfully", users}
    }

    @Get(":id")
    async getUserById(@Param("id") id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("user not found", 404)
        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new HttpException("user not found", 404)
        return findUser;
    }

    @Patch(":id")
    async updateUser(
        @Param("id") id: string, 
        @Body() updateUserDto: UpdateUserDto 
    ) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("Invalid ID", 404)
        const updatedUser = await this.usersService.updateUser(id, updateUserDto)
        if (!updatedUser) throw new HttpException("user not found", 404)
        return { message: "user updated successfully" , updatedUser}
    }

}