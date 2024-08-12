import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './roles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { query } from 'express';
import { STRINGS } from 'src/lib/config';
import { parseQuery, QueryType } from 'src/lib/query';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    await this.roleModel.create(createRoleDto);
    return {
      message: STRINGS.SUCCESS,
    };
  }

  async findAll() {
    const { skip, limit, page, sort, filter } = parseQuery(query, [
      {
        key: 'q',
        type: QueryType.Regex,
        searchedFields: ['firstName', 'lastName'],
      },
    ]);

    const docs = await this.roleModel
      .find(filter, {}, { skip, limit, sort })
      .lean();
    const count = await this.roleModel.countDocuments(filter);
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
      data: await this.roleModel.findById(id).lean(),
    };
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.roleModel.findByIdAndUpdate(id, updateRoleDto).lean();
    return {
      message: STRINGS.SUCCESS,
    };
  }

  async remove(id: string) {
    await this.roleModel.findByIdAndDelete(id).lean();
    return {
      message: STRINGS.SUCCESS,
    };
  }
}
