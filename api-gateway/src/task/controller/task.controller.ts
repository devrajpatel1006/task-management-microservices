import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AppService } from '../../app.service';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TaskService } from '../service/task.service';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(
    private readonly appService: AppService,
    private readonly taskService: TaskService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create task', description: 'Endpoint to add task' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          description: 'Title',
          type: 'string',
        },
        description: {
          description: 'Description',
          type: 'string',
        },
        priority: {
          description: 'Priority (0= Low, 1= Medium, 2= High)',
          type: 'number',
        },
        due_date: {
          description: 'Due Date',
          type: 'string',
        },
      },
    },
  })
  create(@Body() post: any) {
    return this.taskService.create(post);
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get task list',
    description: 'Endpoint to retrieve task list.',
  })
  list() {
    return this.taskService.list();
  }

  @Put('update/:task_id')
  @ApiOperation({
    summary: 'Update task',
    description: 'Endpoint to update the task by Task id.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          description: 'Title',
          type: 'string',
        },
        description: {
          description: 'Description',
          type: 'string',
        },
        priority: {
          description: 'Priority (0= Low, 1= Medium, 2= High)',
          type: 'number',
        },
        due_date: {
          description: 'Due Date',
          type: 'string',
        },
      },
    },
  })
  update(@Param('task_id', ParseIntPipe) task_id: number, @Body() post: any) {
    return this.taskService.update(task_id, post);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search and Sort Tasks' })
  @ApiQuery({ name: 'completionStatus', required: false, type: Boolean })
  @ApiQuery({ name: 'dueDate', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'priority', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'searchTitle', required: false, type: String })
  async searchAndSortTasks(@Query() query: any) {
    return this.taskService.searchAndSortTasks(query);
  }

  @Get('getTasksForUser/:user_id')
  @ApiOperation({
    summary: 'Get task of user by user ID',
    description: 'Endpoint to retrieve user tasks by their ID.',
  })
  getTasksForUser(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.taskService.getTasksForUser(user_id);
  }

  @Patch('markTaskAsComplete/:task_id/complete')
  @ApiOperation({
    summary: 'Update task  status by user ID',
    description: 'Endpoint to Update task  status by user ID.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: {
          description: 'User Id',
          type: 'number',
        },
      },
    },
  })
  markTaskAsComplete(@Param('task_id', ParseIntPipe) task_id: number,@Body() data:any) {
    return this.taskService.markTaskAsComplete({task_id:task_id,user_id:data.user_id});
  }
}
