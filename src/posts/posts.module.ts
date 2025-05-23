import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema} from 'src/schemas/Post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: postSchema }])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
