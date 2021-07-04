import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@t1cketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
