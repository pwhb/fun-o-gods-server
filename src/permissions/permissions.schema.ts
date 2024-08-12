import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from 'src/lib/base.schema';

export type PermissionDocument = HydratedDocument<Permission>;
@Schema()
export class Permission extends Base {
  @Prop()
  name: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  method: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
