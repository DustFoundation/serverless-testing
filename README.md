# @dustfoundation/serverless-testing

![CI](https://github.com/DustFoundation/serverless-testing/actions/workflows/ci.yml/badge.svg)
[![NPM Version](https://badgen.net/npm/v/@dustfoundation/serverless-testing)](https://npmjs.com/package/@dustfoundation/serverless-testing)
[![Minimum Node.js Version](https://badgen.net/npm/node/@dustfoundation/serverless-testing)](https://npmjs.com/package/@dustfoundation/serverless-testing)

Library for testing serverless applications.

## Installation

```sh
npm install --save @dustfoundation/serverless-testing
```

## Features

### Mock API Gateway Proxy Handler

```ts
import { mockAPIGatewayProxyHandler } from '@dustfoundation/serverless-testing';
import { expect } from 'chai';

describe('simple test', () => {
  it('GIVEN valid data THEN 201', async () => {
    // mockAPIGatewayProxyHandler.execute<T> - T is optional generic that describes response body type
    const { statusCode, body } = await mockAPIGatewayProxyHandler(handler)
      .execute<{ users: string[] }>({
        // All fields are optional
        authorizerId: 'YourCustomAuthorizerId, default - uuid v4',
        authorizerGroups: ['YourCustomAuthorizerGroup'],
        pathParameters: { field: 'some' },
        queryStringParameters: { field: 'some' },
        body: JSON.stringify({ field: 'some' }),
        headers: { field: 'some' },
        responseToJson: true, // parse response body as json
        // ... and other
      });

    expect(statusCode).eql(201);
    expect(body.users).lengthOf(5);
  });
});
```

### Mock DynamoDB Stream Handler

```ts
import { mockDDBStreamHandler } from '@dustfoundation/serverless-testing';
import { expect } from 'chai';

describe('simple test', () => {
  it('GIVEN valid data THEN success', async () => {
    // mockDDBStreamHandler.execute<T> - T is optional generic that describes response type
    const users = await mockDDBStreamHandler(handler)
      .execute<string[]>({
        records: [], // DynamoDB Stream Records
      });

    expect(users).lengthOf(5);
  });
});
```
