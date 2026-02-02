import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    return this.prisma.post.create({ data: dto });
  }

  async findAll() {
    return this.prisma.post.findMany({ include: { author: true } });
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id }, include: { author: true } });
  }

  async update(id: number, dto: UpdatePostDto) {
    return this.prisma.post.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}