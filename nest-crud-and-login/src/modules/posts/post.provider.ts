import { Post } from './post.entity';
import { POSTS_REPOSITORY } from '../../core/constants';

export const postsProviders = [
  {
    provide: POSTS_REPOSITORY,
    useValue: Post,
  },
];
