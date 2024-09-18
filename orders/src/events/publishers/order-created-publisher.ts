import { Publisher, OrderCreatedEvent, Subjects } from "@math-web-5180/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
