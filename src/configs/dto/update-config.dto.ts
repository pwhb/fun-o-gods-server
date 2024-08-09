import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateConfigDto } from './create-config.dto';

export class UpdateConfigDto extends PartialType(
  OmitType(CreateConfigDto, ['code'] as const),
) {}
