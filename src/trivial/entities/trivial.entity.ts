import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({ collection: 'preguntas'})
export class Trivial extends Document {

    @Prop({ unique: true, index: true })
    id: number;

    @Prop({ required: true })
    pregunta: string;

    @Prop({ required: true })
    opciones: string[];

    @Prop({ required: false })
    respuesta: string;

    @Prop({required: true})
    respuestaCorrecta: string;

    @Prop({required: true})
    dificultad: string;

}

export const TrivialSchema = SchemaFactory.createForClass(Trivial);
TrivialSchema.set('versionKey', false);