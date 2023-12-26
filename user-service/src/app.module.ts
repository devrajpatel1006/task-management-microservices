import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

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
    }),    TypeOrmModule.forFeature([User]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
