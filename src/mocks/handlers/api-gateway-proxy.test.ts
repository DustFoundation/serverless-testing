import { expect } from 'chai';
import { randomUUID } from 'node:crypto';
import { mockAPIGatewayProxyHandler } from './api-gateway-proxy';

describe('mocks/handlers/api-gateway-proxy', () => {
  const handler = async (): Promise<{ statusCode: number; body: string }> => ({
    statusCode: 201,
    body: JSON.stringify({ users: Array.from({ length: 5 }).fill(randomUUID()) }),
  });

  it('default', async () => {
    const { statusCode, body } = await mockAPIGatewayProxyHandler(handler).execute<{ users: string[] }>({
      authorizerId: 'YourCustomAuthorizerId, default - uuid v4',
      authorizerGroups: ['YourCustomAuthorizerGroup'],
      pathParameters: { field: 'some' },
      queryStringParameters: { field: 'some' },
      body: JSON.stringify({ field: 'some' }),
      headers: { field: 'some' },
      responseToJson: true,
    });

    expect(statusCode).eql(201);
    expect(body.users).lengthOf(5);
  });
});
