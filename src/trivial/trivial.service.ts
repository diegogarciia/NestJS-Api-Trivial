import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Trivial } from './entities/trivial.entity';
import { UsuariosService } from 'src/users/users.service';

@Injectable()
export class TrivialService {

  constructor(
    @InjectModel(Trivial.name) private trivialModel: Model<Trivial>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async todasPreguntas(): Promise<Trivial[]> {
    const preguntas = await this.trivialModel.find().exec();
    
    if (!preguntas || preguntas.length === 0) {
      throw new NotFoundException('No se encontraron preguntas en la base de datos');
    }
    
    return preguntas;
  }

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

    const { respuestaCorrecta, ...datosPublicos } = preguntas[0];
    return datosPublicos;
  }

  async verificarRespuesta(id: number, opcionElegida: string, usuarioId: number) {
    const pregunta = await this.trivialModel.findOne({ id });

    if (!pregunta) {
      throw new NotFoundException(`La pregunta con ID ${id} no existe`);
    }

    const esCorrecta = pregunta.respuestaCorrecta === opcionElegida;

    await this.usuariosService.updateStats(usuarioId, esCorrecta, opcionElegida);

    return {
      correcta: esCorrecta,
      respuestaCorrecta: esCorrecta ? undefined : pregunta.respuestaCorrecta,
    };
  }

  async obtenerPuntuacion(usuarioId: number) {
    const usuario = await this.usuariosService.findOne(usuarioId);
    return { aciertos: usuario?.aciertos || 0 };
  }

  async obtenerHistoricoPreguntas(usuarioId: number) {
    const usuario = await this.usuariosService.findOne(usuarioId);
    return { historico: usuario?.historicoRespuestas || [] };
  }

  async obtenerCantidadPreguntasRespondidas(usuarioId: number) {
    const usuario = await this.usuariosService.findOne(usuarioId);
    return { cantidadPreguntasRespondidas: usuario?.preguntasRespondidas || 0 };
  }

}