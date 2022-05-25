import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import { fakeContext } from '../handlers';

export function mockDDBStreamHandler(handler: DynamoDBStreamHandler): DDBStreamHandlerMock {
  return new DDBStreamHandlerMock(handler);
}

export class DDBStreamHandlerMock {
  private readonly handler: DynamoDBStreamHandler;

  constructor(handler: DynamoDBStreamHandler) {
    this.handler = handler;
  }

  public async execute(options: DDBStreamHandlerMockExecuteOptions): Promise<void> {
    await this.handler(
      {
        Records: options.records,
      },
      fakeContext,
      () => null,
    );
  }
}

export type DDBStreamHandlerMockExecuteOptions = {
  records: DynamoDBStreamEvent['Records'];
};
