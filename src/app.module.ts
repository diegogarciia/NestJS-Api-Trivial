import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TrivialModule } from './trivial/trivial.module';

@Module({
  imports: [UsersModule,
            ConfigModule.forRoot({
              isGlobal: true,
           }),
           MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,),
           AuthModule,
           TrivialModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}