import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

type Config = {
  code: string;
  name: string;
  value: string;
  type: string;
};
export class CreateConfigDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  value: string;

  @IsOptional()
  type: string;

  @IsArray()
  subConfigs: Config[];
}
