import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { STRINGS } from 'src/utils/config';
import { parseQuery, QueryType } from 'src/utils/query';
import { User } from './users.schema';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query: QueryUserDto) {
    const { skip, limit, page, sort, filter } = parseQuery(query, [
      {
        key: 'q',
        type: QueryType.Regex,
        searchedFields: ['firstName', 'lastName'],
      },
    ]);

    const docs = await this.userModel
      .find(filter, {}, { skip, limit, sort })
      .lean();
    const count = await this.userModel.countDocuments(filter);
    return {
      message: STRINGS.SUCCESS,
      page,
      size: limit,
      count,
      data: docs,
    };
  }

  async findOne(id: string) {
    return {
      message: STRINGS.SUCCESS,
      data: await this.userModel.findById(id).lean(),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
