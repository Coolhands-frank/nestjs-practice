import { Controller, Post, Body, Get } from '@nestjs/common'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

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
}