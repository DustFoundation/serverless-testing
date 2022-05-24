import { expect } from 'chai';
import { randomUUID } from 'node:crypto';
import { mockDDBStreamHandler } from './dynamodb-stream';

describe('mocks/handlers/dynamodb-stream', () => {
  const handler = async (): Promise<string[]> => Array.from<string>({ length: 5 }).fill(randomUUID());

  it('default', async () => {
    const users = await mockDDBStreamHandler(handler).execute<string[]>({
      records: [], // DynamoDB Stream Records
    });

    expect(users).lengthOf(5);
  });
});
