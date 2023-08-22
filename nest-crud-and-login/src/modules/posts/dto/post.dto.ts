import { IsNotEmpty, MinLength } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @MinLength(8)
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;
}
