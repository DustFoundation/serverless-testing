import { mockSNSHandler } from './sns';

describe('mocks/handlers/sns', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handler = async (): Promise<void> => {};

  it('default', async () => {
    await mockSNSHandler(handler).execute({
      records: [],
    });
  });
});
