import { PostController } from './post.controller';
import { PostsService } from './post.service';

import { Module } from '@nestjs/common';

@Module({
  controllers: [PostController],
  providers: [PostsService],
})
export class PostModule {}
