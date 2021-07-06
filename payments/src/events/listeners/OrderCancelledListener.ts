import { Message } from 'node-nats-streaming';
import {
  Listener,
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@t1cketing/common';
import { queueGroupName } from './QueueGroupName';
import { Order } from '../../models/Order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
