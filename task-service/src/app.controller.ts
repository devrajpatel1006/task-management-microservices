import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from './models/task.entity';
import {
  addTasksSchema,
  updateTasksSchema,
} from './dto/joi-validations-schema.dto';
import Joi from 'joi';
import { EventBus } from '@nestjs/cqrs';
import { CompletedTaskEvent } from './events/completed-task.event';


@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly eventBus: EventBus
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

  @MessagePattern({ cmd: 'addTask' })
  async addTask(data: any) {
    try {
      await this.validateAsync(data, addTasksSchema);
      let response = await this.appService.create(data);
      return {
        status: true,
        message: 'Task added successfully.',
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

  @MessagePattern({ cmd: 'listTask' })
  async listTask(data: any) {
    try {
      let response = await this.appService.list();
      return {
        status: true,
        message: 'Task found',
        data: response,
      };
    } catch (e) {
      return {
        status: false,
        message: `API Failed with Error ${e.message}`,
        data: {},
      };
    }
  }

  @MessagePattern({ cmd: 'updateTask' })
  async updateTask(data: any) {
    try {
      await this.validateAsync(data, updateTasksSchema);
      let task_id = data.task_id;
      delete data.task_id;

      let taskData: any = await this.appService.findOneBy({ id: task_id });
      if (!taskData) {
        return {
          status: false,
          message: `Task with ID ${task_id} not found`,
          data: {},
        };
      } else {
        if (taskData.is_deleted == 1) {
          return {
            status: false,
            message: `Task with ID ${task_id} is deleted deleted`,
            data: {},
          };
        }
        taskData.title = data.title;
        taskData.description = data.description;
        taskData.priority = data.priority;
        taskData.due_date = data.due_date;

        const updatedUser = await this.appService.create(taskData);
        return {
          status: true,
          message: 'Task update successfully.',
          data: updatedUser,
        };
      }
    } catch (e) {
      return {
        status: false,
        message: `Task update failed with Error ${e.message}`,
        data: {},
      };
    }
  }

  @MessagePattern({ cmd: 'searchAndSortTasks' })
  async searchAndSortTasks(query: any): Promise<any> {
    const updatedUser = await this.appService.searchAndSortTasks(query);
    return {
      status: true,
      message: 'Task found',
      data: updatedUser,
    };
  }

  @MessagePattern({ cmd: 'getTasksForUser' })
  async getTasksForUser(query: any): Promise<any> {
    const taskData = await this.appService.getTasksForUser(query);
    return {
      status: true,
      message: 'Task found',
      data: taskData,
    };
  }

  @MessagePattern({ cmd: 'markTaskAsComplete' })
  async markTaskAsComplete(data: any): Promise<any> {
     // Emit the CompletedTaskEvent
     this.eventBus.publish(new CompletedTaskEvent(data));

    return await this.appService.markTaskAsComplete(data);
  }
}
