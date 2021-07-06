import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@t1cketing/common';
import { queueGroupName } from './QueueGroupName';
import { Order } from '../../models/Order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}
