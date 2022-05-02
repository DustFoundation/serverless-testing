import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import {
  DeleteItemInput,
  DeleteItemOutput,
  GetItemInput,
  GetItemOutput,
  PutItemInput,
  PutItemOutput,
  QueryInput,
  QueryOutput,
  UpdateItemInput,
  UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
import dynamoose from 'dynamoose';

AWSMock.setSDKInstance(AWS);

export class DdbMock {
  private readonly ddb = new AWS.DynamoDB({ region: 'eu-central-1' });

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

  public onQuery(callback?: Callback<QueryInput, QueryOutput>): void {
    this.mockDynamodb('query', callback);
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
    dynamoose.aws.ddb.set(this.ddb);
  }
}

type Callback<Input, Output> = (params: Input) => Output;
