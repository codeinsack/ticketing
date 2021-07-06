import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@t1cketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
