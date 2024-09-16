import { Message } from "node-nats-streaming";
import { Listener } from "@math-web-5180/common";
import { TicketCreatedEvent } from "@math-web-5180/common";
import { Subjects } from "@math-web-5180/common";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  //readonly subject: Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
