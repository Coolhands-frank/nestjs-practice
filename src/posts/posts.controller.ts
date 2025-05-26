import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    createPost(@Request() req: any, @Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(req.user.userId, createPostDto)
    }

    @Get("me")
    getMyPost(@Request() req: any) {
        return this.postsService.findByUser(req.user.userId)
    }

    @Roles("admin")
    @Get()
    getPosts(){
        return this.postsService.getPosts()
    }
}
