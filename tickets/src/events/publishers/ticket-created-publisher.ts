import { Publisher, Subjects, TicketCreatedEvent } from "@math-web-5180/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
