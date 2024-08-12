import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './permissions.schema';
import { Model } from 'mongoose';
import { STRINGS } from 'src/lib/config';
import { parseQuery, QueryType } from 'src/lib/query';
import { QueryPermissionDto } from './dto/query-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  async createPermission(createPermissionDto: CreatePermissionDto) {
    createPermissionDto.slug = createPermissionDto.path.split('/')[3];
    if (!createPermissionDto.name) {
      let action = '';
      if (createPermissionDto.method === 'GET') action = 'read';
      if (createPermissionDto.method === 'POST') action = 'create';
      if (
        createPermissionDto.method === 'PATCH' ||
        createPermissionDto.method === 'PUT'
      )
        action = 'update';
      if (createPermissionDto.method === 'DELETE') action = 'delete';
      createPermissionDto.name =
        `${action} ${createPermissionDto.slug}`.toUpperCase();
    }
    console.log('createPermissionDto', createPermissionDto);

    return await this.permissionModel.create(createPermissionDto);
  }
  async create(createPermissionDto: CreatePermissionDto) {
    await this.createPermission(createPermissionDto);
    return {
      message: STRINGS.SUCCESS,
    };
  }

  async getPermissionId(query: { path: string; method: string }) {
    const found = await this.permissionModel.findOne(query).lean();
    if (found) return found._id;
    const created = await this.createPermission(query);
    return created._id;
  }

  async findAll(query: QueryPermissionDto) {
    const { skip, limit, page, sort, filter } = parseQuery(query, [
      {
        key: 'q',
        type: QueryType.Regex,
        searchedFields: ['method', 'path', 'name'],
      },
    ]);

    const docs = await this.permissionModel
      .find(filter, {}, { skip, limit, sort })
      .lean();
    const count = await this.permissionModel.countDocuments(filter);
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
      data: await this.permissionModel.findById(id).lean(),
    };
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    await this.permissionModel
      .findByIdAndUpdate(id, updatePermissionDto)
      .lean();
    return {
      message: STRINGS.SUCCESS,
    };
  }

  async remove(id: string) {
    await this.permissionModel.findByIdAndDelete(id).lean();
    return {
      message: STRINGS.SUCCESS,
    };
  }
}
