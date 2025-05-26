import { HttpException, Injectable } from '@nestjs/common';
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

    async findByUser(userId: string): Promise<Post[]> {
        const userPosts = await this.postModel.find({ author: userId }).exec()
        if (!userPosts) throw new HttpException("user post not found", 404)
        return userPosts
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec()
        if (!posts) throw new HttpException("post not found", 404)
        return posts
    }

}
