import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from 'src/utils/base.schema';

export type ConfigDocument = HydratedDocument<Config>;
@Schema()
export class Config extends Base {
  @Prop({ unique: true })
  code: string;

  @Prop()
  name: string;

  @Prop()
  value: string;

  @Prop()
  type: string;

  @Prop({ type: Array, default: [] })
  subConfigs: string;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
