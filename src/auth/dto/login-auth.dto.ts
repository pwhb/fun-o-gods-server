import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  rememberMe: boolean;
}
