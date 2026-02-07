import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({ collection: 'usuarios', versionKey: false })
export class User extends Document {
  @Prop({ unique: true, index: true })
  id: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: [String] })
  roles: string[];

  @Prop({ default: 0 })
  aciertos: number;

  @Prop({ default: 0 })
  preguntasRespondidas: number;

  @Prop({ type: [String], default: [] })
  historicoRespuestas: string[];
}

export const UsuarioSchema = SchemaFactory.createForClass(User);
UsuarioSchema.set('versionKey', false);