import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
    // create a new post and return the newly created post
    return await this.postService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<PostEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
