import { Body, Controller, HttpCode, HttpStatus, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { LoginUserDto } from 'src/users/dto/LoginUser.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post("signup")
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto)
    }

    
}