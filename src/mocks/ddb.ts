import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import {
  BatchGetItemInput,
  BatchGetItemOutput,
  BatchWriteItemInput,
  BatchWriteItemOutput,
  DeleteItemInput,
  DeleteItemOutput,
  GetItemInput,
  GetItemOutput,
  PutItemInput,
  PutItemOutput,
  QueryInput,
  QueryOutput,
  ScanInput,
  ScanOutput,
  TransactGetItemsInput,
  TransactGetItemsOutput,
  TransactWriteItemsInput,
  TransactWriteItemsOutput,
  UpdateItemInput,
  UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
import dynamoose from 'dynamoose';

AWSMock.setSDKInstance(AWS);

export class DdbMock {
  public onGetItem(callback?: Callback<GetItemInput, GetItemOutput>): void {
    this.mockDynamodb('getItem', callback);
    this.mockDynamoose();
  }

  public onPutItem(callback?: Callback<PutItemInput, PutItemOutput>): void {
    this.mockDynamodb('putItem', callback);
    this.mockDynamoose();
  }

  public onUpdateItem(callback?: Callback<UpdateItemInput, UpdateItemOutput>): void {
    this.mockDynamodb('updateItem', callback);
    this.mockDynamoose();
  }

  public onDeleteItem(callback?: Callback<DeleteItemInput, DeleteItemOutput>): void {
    this.mockDynamodb('deleteItem', callback);
    this.mockDynamoose();
  }

  public onBatchGetItem(callback?: Callback<BatchGetItemInput, BatchGetItemOutput>): void {
    this.mockDynamodb('batchGetItem', callback);
    this.mockDynamoose();
  }

  public onBatchWriteItem(callback?: Callback<BatchWriteItemInput, BatchWriteItemOutput>): void {
    this.mockDynamodb('batchWriteItem', callback);
    this.mockDynamoose();
  }

  public onTransactGetItems(
    callback?: Callback<TransactGetItemsInput, TransactGetItemsOutput>,
  ): void {
    this.mockDynamodb('transactGetItems', callback);
    this.mockDynamoose();
  }

  public onTransactWriteItems(
    callback?: Callback<TransactWriteItemsInput, TransactWriteItemsOutput>,
  ): void {
    this.mockDynamodb('transactWriteItems', callback);
    this.mockDynamoose();
  }

  public onQuery(callback?: Callback<QueryInput, QueryOutput>): void {
    this.mockDynamodb('query', callback);
    this.mockDynamoose();
  }

  public onScan(callback?: Callback<ScanInput, ScanOutput>): void {
    this.mockDynamodb('scan', callback);
    this.mockDynamoose();
  }

  public restore(): void {
    AWSMock.restore();
    this.mockDynamoose();
  }

  public throwConditionalCheckFailedException(): never {
    const e: any = new Error();
    e.code = 'ConditionalCheckFailedException';
    throw e;
  }

  private mockDynamodb(
    method: keyof AWS.DynamoDB,
    callback: Callback<any, any> = (): any => ({}),
  ): void {
    AWSMock.mock('DynamoDB', method, async (params: any, cb: any) =>
      cb(undefined, callback(params)),
    );
  }

  private mockDynamoose(): void {
    if (!dynamoose) return;
    dynamoose.aws.ddb.set(new AWS.DynamoDB({ region: 'eu-central-1' }));
  }
}

type Callback<Input, Output> = (params: Input) => Output;
