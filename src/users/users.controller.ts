import { Controller, Post, Body, Get, Param, HttpException } from '@nestjs/common'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}
    
    
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Get(":id")
    async getUserById(@Param("id") id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("user not found", 404)
        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new HttpException("user not found", 404)
        return findUser;
    }

}