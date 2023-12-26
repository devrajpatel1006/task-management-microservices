import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from '../../app.service';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Auth')  
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Endpoint to login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          description: 'Email',
          type: 'string',
        },
        password: {
          description: 'Password',
          type: 'string',
        },
      },
    },
  })
  login(@Body() postData: any) {
    return this.appService.login(postData);
  }

 
}
