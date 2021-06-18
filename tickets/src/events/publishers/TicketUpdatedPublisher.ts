import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@t1cketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
