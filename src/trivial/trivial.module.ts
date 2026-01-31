import { Module } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { TrivialController } from './trivial.controller';

@Module({
  providers: [TrivialService],
  controllers: [TrivialController]
})
export class TrivialModule {}
