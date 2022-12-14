import type { SQSEvent, SQSHandler } from 'aws-lambda';
import { fakeContext } from '../handlers';

export function mockSQSHandler(handler: SQSHandler): SQSHandlerMock {
  return new SQSHandlerMock(handler);
}

export class SQSHandlerMock {
  private readonly handler: SQSHandler;

  constructor(handler: SQSHandler) {
    this.handler = handler;
  }

  public async execute(options: SQSHandlerMockExecuteOptions): Promise<void> {
    await this.handler(
      {
        Records: options.records,
      },
      fakeContext,
      () => null,
    );
  }
}

export type SQSHandlerMockExecuteOptions = {
  records: SQSEvent['Records'];
};
