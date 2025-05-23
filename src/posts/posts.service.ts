import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dto/CreatePost.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private postModel: Model<Post>) {}

    async createPost(userId: string, createPostDto: CreatePostDto): Promise<Post>{
        const post = await this.postModel.create({ ...createPostDto, author: userId })
        return post
    }

}
