import { BadRequestException, Controller, Get, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { addUserSchema, deleteUserSchema } from './dto/joi-validations-schema.dto';
import * as Joi from 'joi';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

  @MessagePattern({ cmd: 'addUsers' })
  async addUser(data: any) {
    try {
      await this.validateAsync(data, addUserSchema);
      let response = await this.appService.create(data);
      delete response.password;
      return {
        status: true,
        message: 'User added successfully.',
        data: response,
      };
    } catch (e) {
      return {
        status: false,
        message: `User added failed with Error ${e.message}`,
        data: {},
      };
    }
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async deleteUser(data: any) {
    try {
      await this.validateAsync(data, deleteUserSchema);
      let user_id = data.user_id;
      let userData: any = await this.appService.findOneBy({ id: user_id });
      if (!userData) {
        return {
          status: false,
          message: `User with ID ${user_id} not found`,
          data: {},
        };
      } else {
        if (userData.is_deleted == 1) {
          return {
            status: false,
            message: `User with ID ${user_id} is already deleted`,
            data: {},
          };
        }
        userData.is_deleted = 1; // 1 = deleted, 0 = active
        const updatedUser = await this.appService.create(userData);
        delete updatedUser.password;
        return {
          status: true,
          message: 'User deleted successfully.',
          data: updatedUser,
        };
      }
    } catch (e) {
      return {
        status: false,
        message: `User delete failed with Error ${e.message}`,
        data: {},
      };
    }
  }

  @MessagePattern({ cmd: 'getDefaultUserDetails' })
  async getDefaultUserDetails(user_id: number) {
    let userData: any = await this.appService.findOneBy({ id: user_id });
    if (!userData) {
      return {
        status: false,
        message: `User with ID ${user_id} not found`,
        data: {},
      };
    } else {
      return {
        status: true,
        message: 'User details found',
        data: userData,
      };
    }
  }
}
