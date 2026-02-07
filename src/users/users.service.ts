import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(User.name)
    private readonly usuarioModel: Model<User>
  ) {}

  async create(createUsuarioDto: CreateUserDto) {
    try {
      const nombreFormateado = createUsuarioDto.nombre.trim().toLowerCase();
      createUsuarioDto.nombre = nombreFormateado.charAt(0).toUpperCase() + nombreFormateado.slice(1);
      
      return await this.usuarioModel.create(createUsuarioDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('El ID o el Email ya existen');
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll() {
    return await this.usuarioModel.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioModel.findOne({ id });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async updateStats(id: number, acierta: boolean, respuesta: string) {
    const incrementoAcierto = acierta ? 1 : 0;
    
    return await this.usuarioModel.findOneAndUpdate(
      { id },
      { 
        $inc: { aciertos: incrementoAcierto, preguntasRespondidas: 1 },
        $push: { historicoRespuestas: respuesta }
      },
      { new: true }
    );
  }

  async update(id: number, updateUsuarioDto: UpdateUserDto) {
    const { id: _, ...updateData } = updateUsuarioDto;
    const usuario = await this.usuarioModel.findOneAndUpdate({ id }, updateData, { new: true });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async remove(id: number) {
    const resultado = await this.usuarioModel.findOneAndDelete({ id });
    if (!resultado) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return { message: `Usuario ${id} eliminado` };
  }

  async findEmail(email: string) {
    const user = await this.usuarioModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return user;
  }
  
}

/* SERVICE USERS PRISMA

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  async findAll() {
    return this.prisma.user.findMany({ include: { posts: true } });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: { posts: true } });
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
} */