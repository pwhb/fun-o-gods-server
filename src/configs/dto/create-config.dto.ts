import { IsArray, IsNotEmpty } from 'class-validator';

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

  value: string;
  type: string;

  @IsArray()
  subConfigs: Config[];
}
