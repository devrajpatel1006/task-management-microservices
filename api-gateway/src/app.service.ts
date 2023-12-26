import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, retry } from 'rxjs';

@Injectable()
export class AppService {
  @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy;
  @Inject('CLIENT_SERVICE') private readonly clientService: ClientProxy;

  addUser(data: any) {
    const pattern = { cmd: 'addUsers' };
    const payload = data;

    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

  deleteUser(data: any) {
    const pattern = { cmd: 'deleteUser' };
    const payload = data;

    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

  getDefaultUserDetails(data: number) {
    const pattern = { cmd: 'getDefaultUserDetails' };
    const payload = data;

    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

 

  login(data: any) {

    const pattern = { cmd: 'login' };
    const payload = data;

    return this.clientService
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

}
