import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Base } from 'src/lib/base.schema';
import { User } from 'src/users/users.schema';

export type AuthDocument = HydratedDocument<Auth>;
@Schema()
export class Auth extends Base {
  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
