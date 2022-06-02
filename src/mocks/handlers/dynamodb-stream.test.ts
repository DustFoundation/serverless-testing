import { mockDDBStreamHandler } from './dynamodb-stream';

describe('mocks/handlers/dynamodb-stream', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handler = async (): Promise<void> => {};

  it('default', async () => {
    await mockDDBStreamHandler(handler).execute({
      records: [],
    });
  });
});
