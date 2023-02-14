export const fakeContext = {
  awsRequestId: 'cl2g24jf500027kv3byg1efjp',
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'functionName',
  functionVersion: '$LATEST',
  invokedFunctionArn: 'offline_invokedFunctionArn_for_functionName',
  logGroupName: 'offline_logGroupName_for_functionName',
  logStreamName: 'offline_logStreamName_for_functionName',
  memoryLimitInMB: '128',
  getRemainingTimeInMillis: () => 1,
  done: () => null,
  fail: () => null,
  succeed: () => null,
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
