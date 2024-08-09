import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Base } from 'src/utils/base.schema';

export type TokenDocument = HydratedDocument<Token>;
@Schema()
export class Token extends Base {
  @Prop()
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: Date })
  expiredAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
