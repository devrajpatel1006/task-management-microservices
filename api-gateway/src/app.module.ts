import { Module } from '@nestjs/common';
import { AuthController } from './auth/controller/auth.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/controller/task.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TaskService } from './task/service/task.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
      {
        name: 'SERVICE_B',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      }
    ])
  ],
  controllers: [AuthController,AppController,TaskController],
  providers: [AppService,TaskService],
})
export class AppModule {}
