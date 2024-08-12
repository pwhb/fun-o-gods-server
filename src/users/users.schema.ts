import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Base } from 'src/lib/base.schema';
import { Role } from 'src/roles/roles.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User extends Base {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Role.name })
  roleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('role', {
  ref: Role.name,
  localField: 'roleId',
  foreignField: '_id',
  justOne: true,
});

// UserSchema.set('toObject', { virtuals: true });
// UserSchema.set('toJSON', { virtuals: true });
