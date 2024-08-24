import { HttpException, Injectable } from '@nestjs/common';
import { Token } from './tokens.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {} from 'jsonwebtoken';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { STRINGS } from 'src/lib/config';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async signin(userId: Types.ObjectId, loginAuthDto: LoginAuthDto) {
    const refreshToken = await this.generateRefreshToken(
      userId,
      loginAuthDto.deviceId,
      loginAuthDto.rememberMe,
    );
    const accessToken = await this.generateAccessToken({
      userId: userId.toString(),
      deviceId: loginAuthDto.deviceId,
    });
    return { refresh_token: refreshToken.token, access_token: accessToken };
  }

  async verifyAsync(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async generateAccessToken(payload: { userId: string; deviceId: string }) {
    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(
    userId: Types.ObjectId,
    deviceId: string,
    rememberMe: boolean = false,
  ) {
    return await this.tokenModel
      .findOneAndUpdate(
        { userId: userId, deviceId: deviceId },
        {
          token: uuidv4(),
          expiredAt: dayjs().add(rememberMe ? 7 : 3, 'day'),
          rememberMe,
        },
        { upsert: true, returnDocument: 'after' },
      )
      .lean();
  }

  async refreshToken(token: string, deviceId: string) {
    const prevToken = await this.tokenModel
      .findOne({
        token,
        deviceId,
      })
      .lean();
    if (prevToken && dayjs().isBefore(prevToken.expiredAt)) {
      const refreshToken = await this.generateRefreshToken(
        prevToken.userId,
        deviceId,
        prevToken.rememberMe,
      );
      const accessToken = await this.generateAccessToken({
        userId: prevToken.userId.toString(),
        deviceId: deviceId,
      });
      return { refresh_token: refreshToken.token, access_token: accessToken };
    }
    throw new HttpException(STRINGS.SESSION_EXPIRED_PLEASE_LOGIN_AGAIN, 401);
  }
}
