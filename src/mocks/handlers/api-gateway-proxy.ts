import type { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
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
        body: options.body ?? null,
        headers: options.headers ?? { 'Content-Type': 'application/json' },
        httpMethod: options.httpMethod ?? 'POST',
        isBase64Encoded: options.isBase64Encoded ?? false,
        multiValueHeaders: { 'Content-Type': ['application/json'] },
        multiValueQueryStringParameters: null,
        path: '/path',
        pathParameters: options.pathParameters ?? null,
        queryStringParameters: options.queryStringParameters ?? null,
        requestContext: {
          accountId: 'offlineContext_accountId',
          apiId: 'offlineContext_apiId',
          authorizer: {
            claims: undefined,
            scopes: undefined,
            principalId: 'offlineContext_authorizer_principalId',
            id: options.authorizerId ?? randomUUID(),
            groups: options.authorizerGroups ?? '',
          },
          domainName: 'offlineContext_domainName',
          domainPrefix: 'offlineContext_domainPrefix',
          extendedRequestId: 'cl2g24jf400007kv36kaxg3cl',
          httpMethod: 'POST',
          identity: {
            accessKey: null,
            accountId: 'offlineContext_accountId',
            apiKey: 'offlineContext_apiKey',
            apiKeyId: 'offlineContext_apiKeyId',
            caller: 'offlineContext_caller',
            clientCert: null,
            cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
            cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
            cognitoIdentityId: 'offlineContext_cognitoIdentityId',
            cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
            principalOrgId: null,
            sourceIp: '127.0.0.1',
            user: 'offlineContext_user',
            userAgent: 'PostmanRuntime/7.29.0',
            userArn: 'offlineContext_userArn',
          },
          path: '/path',
          protocol: 'HTTP/1.1',
          requestId: 'cl2g24jf400017kv34ket3tsm',
          requestTime: '26/Apr/2022:14:20:40 +0300',
          requestTimeEpoch: 1_650_972_040_515,
          resourceId: 'offlineContext_resourceId',
          resourcePath: '/dev/path',
          stage: 'dev',
        },
        resource: '/path',
        stageVariables: null,
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

export type APIGatewayProxyHandlerMockExecuteOptions = Partial<
  Pick<
    APIGatewayProxyEvent,
    'body' | 'headers' | 'httpMethod' | 'isBase64Encoded' | 'pathParameters' | 'queryStringParameters'
  >
> & {
  authorizerId?: string;
  authorizerGroups?: string;
  responseToJson?: boolean;
};

export type APIGatewayProxyHandlerMockExecuteResult<T = any> = Omit<APIGatewayProxyResult, 'body'> & {
  body: T;
};
