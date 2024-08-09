import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Base {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
