import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@t1cketing/common';
import { queueGroupName } from './QueueGroupName';
import { expirationQueue } from '../../queues/ExpirationQueue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay =
      new Date(data.expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      { delay },
    );

    msg.ack();
  }
}
