import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@t1cketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
