import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateConfigDto } from './create-config.dto';

export class QueryConfigDto extends PartialType(
  PickType(CreateConfigDto, ['name', 'code'] as const),
) {}
