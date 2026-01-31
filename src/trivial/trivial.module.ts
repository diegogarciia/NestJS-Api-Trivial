import { Module } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { TrivialController } from './trivial.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trivial, TrivialSchema } from './entities/trivial.entity';

@Module({
  controllers: [TrivialController],
  providers: [TrivialService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Trivial.name,
        schema: TrivialSchema,
      },
    ]),
  ],
})

export class TrivialModule {}