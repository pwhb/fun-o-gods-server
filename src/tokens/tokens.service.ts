import { Injectable } from '@nestjs/common';
import { Token } from './tokens.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {} from 'jsonwebtoken';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async signin(userId: Types.ObjectId, rememberMe?: boolean) {
    const refreshToken = await this.generateRefreshToken(
      userId,
      rememberMe ? 7 : 3,
    );
    const accessToken = await this.generateAccessToken(userId.toString());
    return { refreshToken: refreshToken.token, accessToken };
  }

  async generateAccessToken(payload: string) {
    return await this.jwtService.signAsync({ payload });
  }

  async generateRefreshToken(userId: Types.ObjectId, expiry: number) {
    return await this.tokenModel
      .findOneAndUpdate(
        { userId: userId },
        { token: uuidv4(), expiredAt: dayjs().add(expiry, 'day') },
        { upsert: true, returnDocument: 'after' },
      )
      .lean();
  }
}
