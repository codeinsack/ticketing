import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from '@t1cketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
