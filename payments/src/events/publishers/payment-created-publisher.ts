import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@math-web-5180/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
