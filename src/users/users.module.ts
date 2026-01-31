import { Module } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsuarioSchema } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsuariosService],
  exports: [UsuariosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UsuarioSchema,
      },
    ]),
  ],
})

export class UsersModule {}