import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "@math-web-5180/common";
import { TicketUpdatedListener } from "../ticket-updated.listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  // Create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new concert",
    price: 999,
    userId: "ablskdjf",
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, ticket, listener };
};

it("finds, updates, and saves a ticket", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
  const { msg, data, listener, ticket } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {
    console.log("error " + err);
  }

  expect(msg.ack).not.toHaveBeenCalled();
});

it("increments the version number", async () => {
  const { msg, data, ticket, listener } = await setup();

  // Call onMessage with the initial event (version 1)
  await listener.onMessage(data, msg);

  // Retrieve the updated ticket
  const updatedTicket = await Ticket.findById(ticket.id);

  console.log("version " + data.version);
  // Check if the version was incremented to match the event version
  expect(updatedTicket!.version).toEqual(data.version);

  // Send another update event with the next version
  data.version = data.version + 1;
  data.title = "even newer concert";
  await listener.onMessage(data, msg);

  // Retrieve the ticket again after the second update
  const updatedTicket2 = await Ticket.findById(ticket.id);
  console.log("ticket2 version " + data.version);
  // Ensure the version number has been incremented again
  expect(updatedTicket2!.version).toEqual(data.version);
  expect(updatedTicket2!.title).toEqual("even newer concert");
});
