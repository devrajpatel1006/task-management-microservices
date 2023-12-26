import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { User } from './models/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CompletedTaskHandler } from './handlers/completed-task.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_task_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task, User]),
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [AppService,CompletedTaskHandler],
})
export class AppModule {}
