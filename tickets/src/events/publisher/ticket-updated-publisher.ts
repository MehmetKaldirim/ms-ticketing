import { Publisher, Subjects, TicketUpdatedEvent } from "@math-web-5180/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
