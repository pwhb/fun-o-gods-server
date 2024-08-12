import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from 'src/lib/base.schema';

export type MenuDocument = HydratedDocument<Menu>;
@Schema()
export class Menu extends Base {
  @Prop({ required: true, unique: true })
  name: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
