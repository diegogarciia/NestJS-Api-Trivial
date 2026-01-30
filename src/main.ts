import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kleur from 'kleur';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    kleur.green('🌐 ') +
    kleur.green().bold('Application is running on: ') +
    kleur.cyan(await app.getUrl())
  );

}

bootstrap();