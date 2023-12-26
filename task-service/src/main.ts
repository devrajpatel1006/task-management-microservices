import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
const logger = new Logger();

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });

    app.listen();
    logger.log('Task microservice is listening');
  } catch (error) {
    // Handle the error
    console.error('Error starting task microservice:', error.message);
  }
}

bootstrap();
