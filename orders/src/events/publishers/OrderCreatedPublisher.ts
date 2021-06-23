import { OrderCreatedEvent, Publisher, Subjects } from '@t1cketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
