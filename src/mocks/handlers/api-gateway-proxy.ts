import type { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import type { DeepPartial } from '../handlers';
import { fakeContext } from '../handlers';

export function mockAPIGatewayProxyHandler(handler: APIGatewayProxyHandler): APIGatewayProxyHandlerMock {
  return new APIGatewayProxyHandlerMock(handler);
}

export class APIGatewayProxyHandlerMock {
  private readonly handler: APIGatewayProxyHandler;

  constructor(handler: APIGatewayProxyHandler) {
    this.handler = handler;
  }

  public async execute<T = any>(
    options: APIGatewayProxyHandlerMockExecuteOptions = {},
  ): Promise<APIGatewayProxyHandlerMockExecuteResult<T>> {
    const response = await this.handler(
      {
        multiValueHeaders: {} as any,
        body: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null as any,
        pathParameters: null,
        httpMethod: 'GET',
        isBase64Encoded: false,
        path: '/',
        resource: '/',
        stageVariables: null,
        requestContext: {} as any,
        ...options.event,
        headers: { 'Content-Type': 'application/json', ...options.event?.headers },
      },
      fakeContext,
      () => null,
    );

    if (!response) {
      throw new Error('No Response');
    }

    return {
      ...response,
      body: (options.responseToJson ? JSON.parse(response.body) : response.body) as T,
    };
  }
}

export type APIGatewayProxyHandlerMockExecuteOptions = {
  event?: DeepPartial<APIGatewayProxyEvent>;
  responseToJson?: boolean;
};

export type APIGatewayProxyHandlerMockExecuteResult<T = any> = Omit<APIGatewayProxyResult, 'body'> & {
  body: T;
};
