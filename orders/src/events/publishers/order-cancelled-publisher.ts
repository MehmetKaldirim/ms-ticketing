import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@math-web-5180/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
