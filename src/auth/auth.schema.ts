import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AuthDocument = HydratedDocument<Auth>;
@Schema()
export class Auth
{
    @Prop()
    password: string;

    @Prop()
    userId?: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);