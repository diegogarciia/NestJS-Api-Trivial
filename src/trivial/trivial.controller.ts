import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateTrivialDto } from './dto/create-trivial.dto';

@Controller('trivial')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)

export class TrivialController {
  constructor(private readonly trivialService: TrivialService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrivialDto: CreateTrivialDto) {
    return await this.trivialService.create(createTrivialDto);
  }

  @Get('random')
  async getRandomQuestion(@Body() body: { dificultad: string }) {
    return await this.trivialService.obtenerAleatoria(body.dificultad);
  }

  @Post('answer')
  @HttpCode(HttpStatus.OK)
  async checkAnswer(@Body() body: { id: number; respuesta: string }) {
    return await this.trivialService.verificarRespuesta(body.id, body.respuesta);
  }

  @Get('score')
  getScore() {
    return this.trivialService.obtenerPuntuacion();
  }

  @Get('historicoRespuestas')
  getHistoricoRespuestas() {
    return this.trivialService.obtenerHistoricoPreguntas();
  }

  @Get('cantidadPreguntasRespondidas')
  getCantidadPreguntasRespondidas() {
    return this.trivialService.obtenerCantidadPreguntasRespondidas();
  }

}