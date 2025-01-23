import { Injectable, Inject } from '@nestjs/common';
import { POSTS_REPOSITORY } from 'src/core/constants';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POSTS_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  async create(post: PostDto, userId): Promise<Post> {
    return await this.postRepository.create({ ...post, userId });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
  }

  async findOne(id): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({
      where: { id, userId },
    });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}
