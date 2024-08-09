import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  lastName?: string;
}
