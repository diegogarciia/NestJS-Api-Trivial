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
    } as Trivial,
    {
      id: 2,
      pregunta: '¿Qué planeta es conocido como el Planeta Rojo?',
      opciones: ['Júpiter', 'Saturno', 'Marte', 'Venus'],
      respuestaCorrecta: 'Marte',
    } as Trivial,
  ];

  private aciertos: number = 0;

  obtenerAleatoria() {
    const indice = Math.floor(Math.random() * this.preguntas.length);
    const preguntaCompleta = this.preguntas[indice];

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
}