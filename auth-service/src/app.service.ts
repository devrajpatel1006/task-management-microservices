import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(credentials: any) {
    try {
      const options: FindOneOptions<User> = {
        where: { email: credentials.email, password: credentials.password },
      };
      let user:any = await this.userRepository.findOne(options);
      if (!user) {
        return {
          status: false,
          message: `Invalid Email/Password`,
          data: {},
        };
      } else {
        user.jwtToken = this.jwtService.sign({ email: credentials.email })
        return {
          status: true,
          message: `Login successfully`,
          data: user
        };
      }
    } catch (e) {
      return {
        status: false,
        message: `Login failed with Error ${e.message}`,
        data: {},
      };
    }
  }
}
