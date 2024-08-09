import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateConfigDto } from './create-config.dto';
import { IsOptional } from 'class-validator';

export class QueryConfigDto extends PartialType(
  PickType(CreateConfigDto, ['name', 'code'] as const),
) {
  @IsOptional()
  q: string;

  @IsOptional()
  page: number;

  @IsOptional()
  size: number;
}
