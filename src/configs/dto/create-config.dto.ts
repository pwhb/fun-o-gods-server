import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

type Config = {
  code: string;
  name: string;
  value: string;
  type: string;
};
export class CreateConfigDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  value: string;

  @ApiProperty({ required: false })
  @IsOptional()
  type: string;

  @ApiProperty({ default: [] })
  @IsArray()
  subConfigs: Config[];
}
