import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateTrivialDto } from './dto/create-trivial.dto';
import { JwtGuard } from 'src/auth/jwt.guard'; 

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
  async getRandomQuestion(@Query('dificultad') dificultad?: string) {
    return await this.trivialService.obtenerAleatoria(dificultad);
  }

  @UseGuards(JwtGuard)
  @Post('answer')
  @HttpCode(HttpStatus.OK)
  async checkAnswer(@Request() req, @Body() body: { id: number; respuesta: string }) {
    const usuarioId = req.user.id; 
    return await this.trivialService.verificarRespuesta(body.id, body.respuesta, usuarioId);
  }

  @UseGuards(JwtGuard)
  @Get('score')
  async getScore(@Request() req) {
    const usuarioId = req.user.id;
    return await this.trivialService.obtenerPuntuacion(usuarioId);
  }

  @UseGuards(JwtGuard)
  @Get('historicoRespuestas')
  async getHistoricoRespuestas(@Request() req) {
    const usuarioId = req.user.id;
    return await this.trivialService.obtenerHistoricoPreguntas(usuarioId);
  }

  @UseGuards(JwtGuard)
  @Get('cantidadPreguntasRespondidas')
  async getCantidadPreguntasRespondidas(@Request() req) {
    const usuarioId = req.user.id;
    return await this.trivialService.obtenerCantidadPreguntasRespondidas(usuarioId);
  }

}