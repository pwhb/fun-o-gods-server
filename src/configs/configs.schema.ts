import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConfigDocument = HydratedDocument<Config>;
@Schema()
export class Config {
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

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
