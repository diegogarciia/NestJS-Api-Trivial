import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateTrivialDto } from './dto/create-trivial.dto';
import { UpdateTrivialDto } from './dto/update-trivial.dto';

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

  @Get('random')
  getRandomQuestion() {
    return this.trivialService.obtenerAleatoria();
  }

  @Post('answer')
  @HttpCode(HttpStatus.OK)
  checkAnswer(@Body() body: { id: number; respuesta: string }) {
    return this.trivialService.verificarRespuesta(body.id, body.respuesta);
  }

  @Get('score')
  getScore() {
    return this.trivialService.obtenerPuntuacion();
  }
  
}