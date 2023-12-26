import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CompletedTaskEvent } from '../events/completed-task.event';

@EventsHandler(CompletedTaskEvent)
export class CompletedTaskHandler implements IEventHandler<CompletedTaskEvent> {
  handle(event: any) {
    console.log(`Task ${event.data.task_id} completed by user ${event.data.user_id}`);
  }
}