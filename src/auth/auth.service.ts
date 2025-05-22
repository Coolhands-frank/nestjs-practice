import { Injectable, ConflictException, InternalServerErrorException, HttpException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/schemas/User.schema';
import * as argon from "argon2"
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserResponseDto } from 'src/users/dto/UserResponse.dto';
import { LoginUserDto } from 'src/users/dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<UserResponseDto>{

        const hash = await argon.hash(createUserDto.password)

        try {
            
        const user = await this.usersService.createUser({...createUserDto, password: hash.toString()}) 
        return {
            id: user.id,
            userName: user.userName,
            displayName: user.displayName,
            email: user.email,
            role: user.role,
        }

        } catch(error){
            if (error.code === 11000) {
                // Duplicate key error
                const field = Object.keys(error.keyValue)[0];
                throw new ConflictException(`A user with that ${field} already exists.`);
            }
            throw new InternalServerErrorException('Something went wrong while creating the user.');
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{token: string}> {
        // find the user by email
        const user = await this.usersService.findUserByEmail(loginUserDto.email)
        // if user does not exist throw exception 
        if (!user) throw new UnauthorizedException('Invalid credentials');
        // compare password
        const passwordMatch = await argon.verify(user.password, loginUserDto.password)
        // if password incorrect throw exception 
        if (!passwordMatch) throw new UnauthorizedException("Invalid credentials")
        // send back user token
        return {
          token: this.jwtService.sign({ userId: user._id, role: user.role }),
        };

    //    return this.signToken(user.id, user.emal)
    }

//    signToken(userId: string, email: string) {
//        const payload = {
//            sub: userId,
//            email
//        }
//
//        const secret = this.config.get('JWT_SECRET')
//
//        return this.jwtService.signAsync(
//            payload,
//            { 
//            expiresIn: "1h", 
//            secret: secret
//        })
//    }
}
