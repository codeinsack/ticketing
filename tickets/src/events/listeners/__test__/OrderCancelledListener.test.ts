import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent } from '@t1cketing/common';
import { OrderCancelledListener } from '../OrderCancelledListener';
import { natsWrapper } from '../../../natsWrapper';
import { Ticket } from '../../../models/Ticket';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = mongoose.Types.ObjectId().toHexString();

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'dsafsd',
  });
  ticket.set({ orderId });
  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    data,
    msg,
    ticket,
    orderId,
  };
};

it('Updates the ticket, publishes an event, and acks the message', async () => {
  const { ticket, msg, listener, data } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
