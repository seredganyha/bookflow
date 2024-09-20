export interface WorkerRequest<T extends RequestBase> {
  control: T['control'];
  payload?: T['payload'];
  worker: Workers;
  requestId: string;
}

export interface WorkerResponse<T extends ResponseBase> extends ResponseBase {
  control: T['control'];
  payload?: T['payload'];
  requestId: string;
}

export interface RequestBase {
  worker: Workers;
  control: string;
  payload?: any;
  requestId: string;
}

export type RequestBaseNotId = Omit<RequestBase, "requestId">

export interface ResponseBase {
  control: string;
  payload?: any;
  status: ResponseStatus;
  requestId: string;
}

export enum ResponseStatus {
  Success = 'success',
  Error = 'error'
}

export enum Workers {
  FileWorker = 'fileWorker',
  TMWorker = 'TMWorker',
}
