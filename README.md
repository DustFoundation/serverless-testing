# serverless-testing

Library for testing serverless applications. Think about tests, not about mocks.

## Utils

* stringifyParams – object output for parameterized tests
* getRandomFloat – random integer/float number between range

## Mocks

### AWS API Gateway Proxy Handler

```ts
import { HandlerMock } from '@dustfoundation/serverless-testing';
import { expect } from 'chai';

describe('simple test', () => {
  const handlerMock = new HandlerMock(handler);

  it('GIVEN valid data THEN 201', async () => {
    // handlerMock.execute<T> - T is optional generic that relates to response body type
    const { statusCode, body } = await handlerMock
      .execute<{ users: string[] }>({
        // All fields are optional
        authorizerId: 'your custom authorizer id, default - uuid v4',
        pathParameters: { field: 'some' },
        queryStringParameters: { field: 'some' },
        body: JSON.stringify({ field: 'some' }),
        headers: { field: 'some' },
        responseToJson: true, // parse response body as json
        // ... and other
      })

    expect(statusCode).eql(201);
    expect(body.users).lengthOf(5);
  });
});
```

### AWS DynamoDB + Dynamoose (optional)

```ts
import { DdbMock } from '@dustfoundation/serverless-testing';

describe('simple test', () => {
  const ddbMock = new DdbMock();

  afterEach(() => ddbMock.restore());

  it('GIVEN valid data THEN 201', async () => {
    ddbMock.onGetItem((params) => ({
      Item: {
        field: { S: 'some' },
      },
    }));

    // DynamoDB Get Request is now mocked and returns your data when executed!
  });
});
```
