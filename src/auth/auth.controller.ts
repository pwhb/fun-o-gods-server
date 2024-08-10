import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ChangePasswordAuthDto } from './dto/change-passwd.dto';
import { Public } from './auth.guard';
import { Request } from 'express';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Req() request: Request) {
    return this.authService.me(request['user']);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('changePassword')
  @HttpCode(HttpStatus.OK)
  changePassword(@Body() body: ChangePasswordAuthDto, @Req() request: Request) {
    return this.authService.changePassword(body, request['user']);
  }
}
