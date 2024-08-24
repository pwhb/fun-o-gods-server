import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, verify } from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { STRINGS } from 'src/lib/config';
import { TokensService } from 'src/tokens/tokens.service';
import { ChangePasswordAuthDto } from './dto/change-passwd.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tokensService: TokensService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userModel
      .findOne({ email: loginAuthDto.email })
      .populate({
        path: 'role',
        select: {
          _id: 0,
          name: 1,
        },
      })
      .lean();
    if (!user) throw new Error(STRINGS.USER_NOT_FOUND);
    const auth = await this.authModel.findOne({ userId: user._id }).lean();
    const valid = await verify(auth.password, loginAuthDto.password);
    if (!valid) throw new Error(STRINGS.INVALID_PASSWORD);
    const tokens = await this.tokensService.signin(user._id, loginAuthDto);
    return { message: STRINGS.SUCCESS, data: user, auth: tokens };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const auth = await this.tokensService.refreshToken(
      dto.refresh_token,
      dto.deviceId,
    );
    return { message: STRINGS.SUCCESS, auth };
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).populate('role').lean();
    if (!user) throw new Error(STRINGS.USER_NOT_FOUND);
    return user;
  }

  async me(data: unknown) {
    return {
      message: STRINGS.SUCCESS,
      data: data,
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userModel.findOne({
      email: registerAuthDto.email,
    });
    if (user) throw new Error(STRINGS.USER_ALREADY_EXISTS);

    const res = await this.userModel.create(registerAuthDto);
    const hashed = await hash(registerAuthDto.password);
    await this.authModel.create({
      userId: res._id,
      password: hashed,
    });
    return {
      message: STRINGS.USER_CREATED_SUCCESSFULLY,
    };
  }

  async changePassword(
    changePasswordAuthDto: ChangePasswordAuthDto,
    user: UserDocument,
  ) {
    if (!user) throw new Error(STRINGS.USER_NOT_FOUND);
    const auth = await this.authModel.findOne({ userId: user._id });
    if (!auth) throw new Error(STRINGS.USER_NOT_FOUND);
    const valid = await verify(auth.password, changePasswordAuthDto.password);
    if (!valid) throw new Error(STRINGS.INVALID_PASSWORD);
    const hashed = await hash(changePasswordAuthDto.newPassword);
    await this.authModel.findOneAndUpdate(
      { userId: user._id },
      {
        password: hashed,
      },
    );
    return {
      message: STRINGS.PASSWORD_CHANGED_SUCCESSFULLY,
    };
  }
}
