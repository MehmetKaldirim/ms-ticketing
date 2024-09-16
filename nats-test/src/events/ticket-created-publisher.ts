import { Publisher } from "@math-web-5180/common";
import { TicketCreatedEvent } from "@math-web-5180/common";
import { Subjects } from "@math-web-5180/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
