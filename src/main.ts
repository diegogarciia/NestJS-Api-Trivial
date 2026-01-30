import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import kleur from 'kleur';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    kleur.green('🌐 ') +
    kleur.green().bold('Application is running on: ') +
    kleur.cyan(await app.getUrl())
  );

}

bootstrap();