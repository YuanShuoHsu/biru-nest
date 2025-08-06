import { PostsService } from './post.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostsService) {}

  @Get(':id')
  getById(@Param('id') id: string): Promise<PostModel | null> {
    return this.postService.post({ id: Number(id) });
  }

  @Get()
  getPublished(): Promise<PostModel[]> {
    return this.postService.posts({ where: { published: true } });
  }

  @Get('search/:q')
  search(@Param('q') searchString: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      },
    });
  }

  @Post()
  create(
    @Body() dto: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    return this.postService.createPost({
      title: dto.title,
      content: dto.content,
      author: { connect: { email: dto.authorEmail } },
    });
  }

  @Put('publish/:id')
  publish(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
