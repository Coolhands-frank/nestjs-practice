import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';

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
            userName: user.username,
            Email: user.email
        }))
    }

    getUserById(id: string) {
        return this.userModel.findById(id)
    }
}
