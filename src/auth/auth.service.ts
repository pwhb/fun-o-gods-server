import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, verify } from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService
{
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }
  async login(loginAuthDto: LoginAuthDto)
  {
    const user = await this.userModel.findOne({ email: loginAuthDto.email }).lean();
    if (!user) throw new Error('User not found');
    console.log(user);

    const auth = await this.authModel.findOne({ userId: user._id }).lean();
    const valid = await verify(auth.password, loginAuthDto.password);
    return { valid };
  }

  async register(registerAuthDto: RegisterAuthDto)
  {
    const alreadyExists = await this.userModel.findOne({ email: registerAuthDto.email });
    if (alreadyExists) throw new Error('User already exists');
    const res = await this.userModel.create(registerAuthDto);
    const hashed = await hash(registerAuthDto.password);
    await this.authModel.create({
      userId: res._id,
      password: hashed
    });
    return {
      id: res.id
    };
  }
}
