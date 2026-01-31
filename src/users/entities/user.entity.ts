import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({ collection: 'usuarios'})
export class User extends Document {

    @Prop({ unique: true, index: true })
    id: number;

    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({required: true})
    roles: string[];

}

export const UsuarioSchema = SchemaFactory.createForClass(User);
UsuarioSchema.set('versionKey', false);