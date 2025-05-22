import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserResponseDto } from './dto/UserResponse.dto';
import { RouterModule } from '@nestjs/core';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const newUser = await this.userModel.create(createUserDto)
        return {
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
            displayName: newUser.displayName,
            role: newUser.role
        };
    }

    async findUserByEmail(email: string): Promise<any> {
        const findUser = await this.userModel.findOne({ email })
        return findUser
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec()
        return users
    }

    async getUserById(id: string): Promise<User | null> {
        const singleUser = await this.userModel.findById(id).exec()
        return singleUser
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true}).exec()
        return updatedUser   
    }

    async deleteUser(id: string): Promise<User | null> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec()
        return deletedUser
    }
}
