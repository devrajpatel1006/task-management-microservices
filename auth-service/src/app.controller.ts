import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { loginSchema } from './dto/joi-validations-schema.dto';
import Joi from 'joi';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async validateAsync(data: any, schema: Joi.ObjectSchema): Promise<any> {
    return new Promise((resolve, reject) => {
      const { error, value } = schema.validate(data);
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: any) {
    try {
      await this.validateAsync(data, loginSchema);
      return await this.appService.login(data);
    } catch (e) {
      return {
        status: false,
        message: `Login failed with Error ${e.message}`,
        data: {},
      };
    }
  }
}
