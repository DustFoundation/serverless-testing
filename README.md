# @dustfoundation/serverless-testing

Library for testing serverless applications.

## Installation

```sh
npm install --save @dustfoundation/serverless-testing
```

## Features

### Mock API Gateway Proxy Handler

```ts
import { mockHandler } from '@dustfoundation/serverless-testing';
import { expect } from 'chai';

describe('simple test', () => {
  it('GIVEN valid data THEN 201', async () => {
    // mockHandler.execute<T> - T is optional generic that describes response body type
    const { statusCode, body } = await mockHandler(handler)
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

### Stringify Params

Utility for parameterized tests.

```ts
import { stringifyParams } from '@dustfoundation/serverless-testing';

const dataSet = [{ symbol: "BTC" }, { symbol: "ETH" }];
for (const data of dataSet) {
  it(`Data ${stringifyParams(data)}`, async () => {
    // ...
  });
}
```
