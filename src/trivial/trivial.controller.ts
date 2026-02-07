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
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

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

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('preguntas')
  async getPreguntas(@Request() req) {
    return await this.trivialService.todasPreguntas();
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrivialDto: CreateTrivialDto) {
    return await this.trivialService.create(createTrivialDto);
  }

  @Roles('admin', 'jugador')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('random')
  async getRandomQuestion(@Query('dificultad') dificultad?: string) {
    return await this.trivialService.obtenerAleatoria(dificultad);
  }

  @Roles('admin', 'jugador')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('answer')
  @HttpCode(HttpStatus.OK)
  async checkAnswer(@Request() req, @Body() body: { id: number; respuesta: string }) {
    const usuarioId = req.user.id; 
    return await this.trivialService.verificarRespuesta(body.id, body.respuesta, usuarioId);
  }

  @Roles('admin', 'jugador')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('score')
  async getScore(@Request() req) {
    const usuarioId = req.user.id;
    return await this.trivialService.obtenerPuntuacion(usuarioId);
  }

  @Roles('admin', 'jugador')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('historicoRespuestas')
  async getHistoricoRespuestas(@Request() req) {
    const usuarioId = req.user.id;
    return await this.trivialService.obtenerHistoricoPreguntas(usuarioId);
  }

  @Roles('admin', 'jugador')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('cantidadPreguntasRespondidas')
  async getCantidadPreguntasRespondidas(@Request() req) {
    const usuarioId = req.user.id;
    return await this.trivialService.obtenerCantidadPreguntasRespondidas(usuarioId);
  }

}