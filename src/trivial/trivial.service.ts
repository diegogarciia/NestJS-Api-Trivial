import { Injectable } from '@nestjs/common';
import { Trivial } from './entities/trivial.entity';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TrivialService {

  constructor(
    @InjectModel(Trivial.name) private trivialModel: Model<Trivial>,
  ) {}

  private aciertos: number = 0;

  private historicoRespuestas: string[] = [];

  private cantidadPreguntasRespondidas: number = 0;

  async create(createTrivialDto: any): Promise<Trivial> {
    const nuevaPregunta = new this.trivialModel(createTrivialDto);
    return await nuevaPregunta.save();
  }

  async obtenerAleatoria(nivel?: string) {
    const filtro = nivel ? { dificultad: nivel } : {};

    const preguntas = await this.trivialModel.aggregate([
      { $match: filtro },
      { $sample: { size: 1 } },
    ]);

    if (preguntas.length === 0) {
      throw new NotFoundException(`No hay preguntas para el nivel: ${nivel}`);
    }

    const preguntaCompleta = preguntas[0];
    const { respuestaCorrecta, ...datosPublicos } = preguntaCompleta;

    return datosPublicos;
  }

  async verificarRespuesta(id: number, opcionElegida: string) {
    const pregunta = await this.trivialModel.findOne({ id: id });

    if (!pregunta) {
      throw new NotFoundException(`La pregunta con ID ${id} no existe`);
    }

    this.cantidadPreguntasRespondidas++;
    this.historicoRespuestas.push(opcionElegida);

    const esCorrecta = pregunta.respuestaCorrecta === opcionElegida;

    if (esCorrecta) {
      this.aciertos++;
      return { correcta: true };
    }

    return {
      correcta: false,
      respuestaCorrecta: pregunta.respuestaCorrecta,
    };
  }

  obtenerPuntuacion() {
    return { aciertos: this.aciertos };
  }

  obtenerHistoricoPreguntas() {
    return { historico: this.historicoRespuestas };
  }

  obtenerCantidadPreguntasRespondidas() {
    return { cantidadPreguntasRespondidas: this.cantidadPreguntasRespondidas };
  }

}