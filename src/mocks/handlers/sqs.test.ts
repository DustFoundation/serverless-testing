import { mockSQSHandler } from './sqs';

describe('mocks/handlers/sns', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handler = async (): Promise<void> => {};

  it('default', async () => {
    await mockSQSHandler(handler).execute({
      records: [],
    });
  });
});
