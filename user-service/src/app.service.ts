import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: any) {
    return this.userRepository.save(user);
  }

  findOneBy(params: any) {
    return this.userRepository.findOneBy(params);
  }
}
