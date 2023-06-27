import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.usersRepository.create<User>(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne<User>({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne<User>({
      where: { id },
    });
  }
}
