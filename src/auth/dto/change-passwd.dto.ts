import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordAuthDto {
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
