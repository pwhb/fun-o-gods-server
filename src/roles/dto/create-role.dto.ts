import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  menuIds: string[];

  @IsArray()
  permissionsIds: string[];
}
