import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, retry } from 'rxjs';

@Injectable()
export class TaskService {
  @Inject('TASK_SERVICE') private readonly taskService: ClientProxy;
  @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy;
  @Inject('CLIENT_SERVICE') private readonly clientService: ClientProxy;

  create(data: any) {
    const pattern = { cmd: 'addTask' };
    const payload = data;

    return this.taskService
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

  list() {
    const pattern = { cmd: 'listTask' };
    const payload = {};

    return this.taskService
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

  update(task_id: number, data: any) {
    const pattern = { cmd: 'updateTask' };
    data.task_id = task_id;
    const payload = data;

    return this.taskService
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

  searchAndSortTasks(query: any) {
    const pattern = { cmd: 'searchAndSortTasks' };
    const payload = query;

    return this.taskService
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

  getTasksForUser(user_id: any) {
    const pattern = { cmd: 'getTasksForUser' };
    const payload = user_id;

    return this.taskService
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }

  markTaskAsComplete(data: any) {
    const pattern = { cmd: 'markTaskAsComplete' };
    const payload = data;

    return this.taskService
      .send<string>(pattern, payload)
      .pipe(map((message: string) => message));
  }
}
