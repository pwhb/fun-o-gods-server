import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config } from './configs.schema';
import { STRINGS } from 'src/utils/config';
import { QueryConfigDto } from './dto/query-config.dto';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectModel(Config.name) private readonly configModel: Model<Config>,
  ) {}
  async create(createConfigDto: CreateConfigDto)
  {
    await this.configModel.create(createConfigDto);
    return {
      message: STRINGS.SUCCESS,
    };
  }

  async findAll(query: QueryConfigDto)
  {
    console.log(query);
    
    const docs = await this.configModel.find();
    const count = await this.configModel.countDocuments();
    return {
      message: STRINGS.SUCCESS,
      count,
      data: docs
    };
  }

  async findOne(id: string)
  {
    return {
      message: STRINGS.SUCCESS,
      data: await this.configModel.findById(id)
    };
  }

  async update(id: string, updateConfigDto: UpdateConfigDto) {
    await this.configModel.findByIdAndUpdate(id, updateConfigDto);
    return {
      message: STRINGS.SUCCESS
    };
  }

  remove(id: string) {
    return this.configModel.findByIdAndDelete(id);
  }
}
