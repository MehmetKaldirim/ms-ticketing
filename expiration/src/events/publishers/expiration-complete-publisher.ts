import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@math-web-5180/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
