import { DynamoDBStreamEvent, Handler } from 'aws-lambda';
import { fakeContext } from '../handlers';

export function mockDDBStreamHandler(handler: DynamoDBStreamHandler): DDBStreamHandlerMock {
  return new DDBStreamHandlerMock(handler);
}

export class DDBStreamHandlerMock {
  private readonly handler: DynamoDBStreamHandler;

  constructor(handler: DynamoDBStreamHandler) {
    this.handler = handler;
  }

  public async execute<T = any>(options: DDBStreamHandlerMockExecuteOptions): Promise<T> {
    const response = await this.handler(
      {
        Records: options.records,
      },
      fakeContext,
      () => null,
    );

    return response as any as T;
  }
}

export type DDBStreamHandlerMockExecuteOptions = {
  records: DynamoDBStreamEvent['Records'];
};

type DynamoDBStreamHandler = Handler<DynamoDBStreamEvent, any>;
