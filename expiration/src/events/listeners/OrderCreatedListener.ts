import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@t1cketing/common';
import { queueGroupName } from './QueueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //
  }
}
