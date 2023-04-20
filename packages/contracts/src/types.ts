export type SendOptions = {
  from?: string;
  gasPrice?: string;
  gas?: number;
  value?: number | string;
  nonce?: number;
  onMethod: 'transactionHash' | 'receipt' | 'confirmation';
};

export interface ContractProps {
  contractAddress: string;
  aelfContract?: any;
  aelfInstance?: any;
  rpcUrl: string;
}

export interface ErrorMsg {
  name?: string;
  code?: number;
  message?: string;
}
export interface ViewResult {
  data?: any;
  error?: ErrorMsg;
}

export interface SendResult extends ViewResult {
  transactionId?: string;
}

export type CallViewMethod = (
  functionName: string,
  paramsOption?: any,
  callOptions?: {
    defaultBlock: number | string;
    options?: any;
    callback?: any;
  },
) => Promise<ViewResult>;

export type CallSendMethod = (
  functionName: string,
  account: string,
  paramsOption?: any,
  sendOptions?: SendOptions,
) => Promise<SendResult>;

export type ContractBasicErrorMsg = ErrorMsg;

export type AElfCallViewMethod = (functionName: string, paramsOption?: any) => Promise<ViewResult>;

export type AElfCallSendMethod = (
  functionName: string,
  paramsOption?: any,
  sendOptions?: SendOptions,
) => Promise<SendResult>;
