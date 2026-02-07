import { Controller, Get, Post, Put, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({  
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true 
}))

export class UsersController {
  constructor(private readonly usersService: UsuariosService) {}

  @Post()
  @HttpCode( HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUserDto) {
    return this.usersService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usersService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

}