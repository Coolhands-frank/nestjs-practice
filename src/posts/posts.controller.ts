import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    createPost(@Request() req: any, @Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(req.user.userId, createPostDto)
    }
}
