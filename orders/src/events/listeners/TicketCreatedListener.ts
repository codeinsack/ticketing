import { Message } from 'node-nats-streaming';
import { Listener, Subjects, TicketCreatedEvent } from '@t1cketing/common';
import { queueGroupName } from './QueueGroupName';
import { Ticket } from '../../models/Ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { title, price, id } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
