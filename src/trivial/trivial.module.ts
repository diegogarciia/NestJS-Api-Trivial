import { Module } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { TrivialController } from './trivial.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trivial, TrivialSchema } from './entities/trivial.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'), 
        signOptions: { 
          expiresIn: configService.get<number>('JWT_EXPIRES_IN') || 3600 
        },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Trivial.name,
        schema: TrivialSchema,
      },
    ]),
  ],
  controllers: [TrivialController],
  providers: [TrivialService],
})
export class TrivialModule {}