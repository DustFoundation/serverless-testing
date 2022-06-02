import { SNSEvent, SNSHandler } from 'aws-lambda';
import { fakeContext } from '../handlers';

export function mockSNSHandler(handler: SNSHandler): SNSHandlerMock {
  return new SNSHandlerMock(handler);
}

export class SNSHandlerMock {
  private readonly handler: SNSHandler;

  constructor(handler: SNSHandler) {
    this.handler = handler;
  }

  public async execute(options: SNSHandlerMockExecuteOptions): Promise<void> {
    await this.handler(
      {
        Records: options.records,
      },
      fakeContext,
      () => null,
    );
  }
}

export type SNSHandlerMockExecuteOptions = {
  records: SNSEvent['Records'];
};
