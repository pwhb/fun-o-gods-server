import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';

import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class QueryUserDto extends PartialType(
  PickType(CreateUserDto, ['firstName', 'lastName'] as const),
) {
  @IsOptional()
  q: string;

  @IsOptional()
  page: number;

  @IsOptional()
  size: number;

  @IsOptional()
  sort_by: string;
}
