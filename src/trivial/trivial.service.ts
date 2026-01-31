import { Injectable } from '@nestjs/common';
import { Trivial } from './entities/trivial.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TrivialService {
  private preguntas: Trivial[] = [
    {
      id: 1,
      pregunta: '¿Cuál es la capital de Italia?',
      opciones: ['Roma', 'Milán', 'Venecia', 'Florencia'],
      respuestaCorrecta: 'Roma',
      dificultad: 'facil',
    } as Trivial,
    {
      id: 2,
      pregunta: '¿Qué planeta es conocido como el Planeta Rojo?',
      opciones: ['Júpiter', 'Saturno', 'Marte', 'Venus'],
      respuestaCorrecta: 'Marte',
      dificultad: 'dificil',
    } as Trivial,
  ];

  private aciertos: number = 0;

  private historicoRespuestas: string[] = [];

  private cantidadPreguntasRespondidas: number = 0;

  obtenerAleatoria(nivel?: string) {
    const preguntasFiltradas = nivel
      ? this.preguntas.filter((p) => p.dificultad === nivel)
      : this.preguntas;

    if (preguntasFiltradas.length === 0) {
      throw new NotFoundException(`No hay preguntas para el nivel: ${nivel}`);
    }

    const indice = Math.floor(Math.random() * preguntasFiltradas.length);
    const preguntaCompleta = preguntasFiltradas[indice];

    const { respuestaCorrecta, ...datosPublicos } = preguntaCompleta;

    return datosPublicos;
  }

  verificarRespuesta(
    id: number,
    opcionElegida: string,
  ): { correcta: boolean; respuestaCorrecta?: string } {
    const pregunta = this.preguntas.find((p) => p.id === id);

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