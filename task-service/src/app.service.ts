import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from 'src/models/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(post: any) {
    return this.taskRepository.save(post);
  }

  list() {
    return this.taskRepository.find();
  }

  findOneBy(params: any) {
    return this.taskRepository.findOneBy(params);
  }

  async searchAndSortTasks(query: any): Promise<Task[]> {
    const { completionStatus, dueDate, priority, searchTitle } = query;

    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (completionStatus !== undefined) {
      queryBuilder.andWhere('task.status = :completionStatus', {
        completionStatus,
      });
    }

    if (dueDate !== undefined) {
      queryBuilder.orderBy('task.due_date', dueDate === 'asc' ? 'ASC' : 'DESC');
    }

    if (priority !== undefined) {
      queryBuilder.orderBy(
        'task.priority',
        priority === 'asc' ? 'ASC' : 'DESC',
      );
    }

    if (searchTitle) {
      queryBuilder.andWhere(
        '(task.title LIKE :searchTitle OR task.description LIKE :searchTitle)',
        {
          searchTitle: `%${searchTitle}%`,
        },
      );
    }

    return queryBuilder.getMany();
  }

  async getTasksForUser(user_id): Promise<Task[]> {
    return this.taskRepository.find({ where: { user_id } });
  }

  async markTaskAsComplete(data: any) {
    const { task_id, user_id } = data;

    const task = await this.taskRepository.findOne({
      where: { id: task_id, user_id: user_id },
    });

    if (!task) {
      return {
        status: false,
        message: `Task not found with ${task_id} ID`,
        data: [],
      };
    }
    if (task.status == 1) {
      return {
        status: false,
        message: `Task is already completed with ${task_id} ID`,
        data: [],
      };
    }
    task.status = 1;
    await this.taskRepository.save(task);
    return {
      status: true,
      message: 'Task is marked as completed.',
      data: [],
    };
  }
}
