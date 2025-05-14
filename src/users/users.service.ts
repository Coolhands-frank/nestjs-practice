import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto)
        const result = await newUser.save();
        return result.id as string;
    }

    async getUsers() {
        const users = await this.userModel.find().exec()
        return users.map((user) => ({
            id: user.id,
            userName: user.userName,
            email: user.email
        }))
    }

    async getUserById(id: string) {
        const singleUser = await this.userModel.findById(id).exec()
        return {
            id: singleUser?.id,
            userName: singleUser?.userName,
            email: singleUser?.email
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true}).exec()
        return updatedUser   
    }

    async deleteUser(id: string) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec()
        return deletedUser
    }
}
