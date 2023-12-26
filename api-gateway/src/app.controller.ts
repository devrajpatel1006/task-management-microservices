import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';


@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

 

  @ApiTags('Users')  
  @Post('addUser')
  @ApiOperation({ summary: 'Add users', description: 'Endpoint to add users' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          description: 'Email',
          type: 'string',
        },
        username: {
          description: 'Username',
          type: 'string',
        },
        type: {
          description: 'User type (0=Admin, 1=Default)',
          type: 'number',
        },
      },
    },
  })
  addUser(@Body() postData: any) {
    return this.appService.addUser(postData);
  }

  @ApiTags('Users')  
  @Post('Delete user')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Endpoint to delete user',
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
  deleteUser(@Body() postData: any) {
    return this.appService.deleteUser(postData);
  }

  @ApiTags('Users')  
  @Get('getDefaultUserDetails/:id')
  @ApiOperation({
    summary: 'Get default user details by ID',
    description: 'Endpoint to retrieve details of a default user by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'integer',
    example: 1,
  })
  getDefaultUserDetails(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getDefaultUserDetails(id);
  }

  

}
