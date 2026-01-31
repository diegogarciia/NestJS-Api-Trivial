import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsuariosService {

  constructor(
    
  @InjectModel(User.name)
  private readonly usuarioModel: Model<User>) {}

  async create(createUsuarioDto: CreateUserDto) {
    
    console.log('CreateUsuarioDto recibido en el servicio:', createUsuarioDto);
    try {
        createUsuarioDto.nombre = createUsuarioDto.nombre.toLowerCase();
        createUsuarioDto.nombre = createUsuarioDto.nombre.charAt(0).toUpperCase() + createUsuarioDto.nombre.slice(1);
        const usuarioInertado = await this.usuarioModel.create(createUsuarioDto)  
        return usuarioInertado;
    }catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('El id de usuario ya existe')
      }
      throw new InternalServerErrorException('Error al crear el usuario - Revisar logs')
    }
    
  }

  async findAll() {
    try {
      return await this.usuarioModel.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findOne(id: number) {
    const usuario = await this.usuarioModel.findOne({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findEmail(email: string) {
    const user = await this.usuarioModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUserDto) {
    try {
      const { id: _, ...updateData } = updateUsuarioDto;

      const usuarioActualizado = await this.usuarioModel.findOneAndUpdate(
        { id },
        updateData,
        { new: true, runValidators: true }, 
      );

      if (!usuarioActualizado) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return usuarioActualizado;
    } catch (error) {
      throw new NotFoundException('Error al actualizar el usuario');
    }
  }

  async remove(id: number) {
    const usuarioEliminado = await this.usuarioModel.findOneAndDelete({ id });

    if (!usuarioEliminado) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }

}