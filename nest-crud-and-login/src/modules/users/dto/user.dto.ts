import { IsEnum, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserDto {
  readonly id: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  readonly avatar: string;

  readonly bio: string;

  readonly website: string;

  @IsNotEmpty()
  readonly location: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female'])
  readonly gender: string;

  @IsNotEmpty()
  readonly status: string;
  readonly relationship: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
