import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private users : User[]= [
    {
      id: 1,
      name: 'Diego García Ángel',
      email: "diego@example.com",
      password: "123"
    },
    {
      id: 2,
      name: 'Ian Gabriel Castellanos',
      email: "ian@example.com",
      password: "123"
    }
  ];

  private generateUniqueId = () => {
    let newId;
    do {
      newId = Math.floor(Math.random() * 1000) + 1;
    } while (this.users.some(user => user.id === newId));
    return newId;
  };

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    if (this.users.find(user => user.id === id) === undefined) {
      throw new NotFoundException('Usuario con ID ${id} no encontrado')
    }
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
