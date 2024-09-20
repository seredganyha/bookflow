import { QueueNode } from "text-manager";
import { RequestBase, ResponseStatus, WorkerResponse } from "../worker.types";

export enum TMWorkerControls {
  GetIndexes = 'getIndexes',
  SetIndexes = 'setIndexes',
  GetFragment = 'getFragment',
  SetDOMBook = 'setDOMBook',
  InitTM = 'initTM',
}

export type TMIndexes = [number, number]

export interface TMOptions {
  dom: Document,
  queueNode: QueueNode,
  maxChar: number,
  indexes: TMIndexes
}

export interface RequestedTMOptions {
  textDocument: string,
  maxChar: number,
  indexes: TMIndexes
}

//===============================\\
//            REQUEST            \\
//===============================\\


export interface GetIndexesRequest extends RequestBase {
  control: TMWorkerControls.GetIndexes;
  payload: null;
}

export interface SetIndexesRequest extends RequestBase {
  control: TMWorkerControls.SetIndexes;
  payload: TMIndexes;
}

export interface GetFragmentRequest extends RequestBase {
  control: TMWorkerControls.GetFragment;
  payload?: null;
}

export interface SetDOMBookRequest extends RequestBase {
  control: TMWorkerControls.SetDOMBook;
  payload: Document;
}

export interface InitTMRequest extends RequestBase {
  control: TMWorkerControls.InitTM;
  payload: RequestedTMOptions;
}

export type TMWorkerRequestList =
  | InitTMRequest
  | GetIndexesRequest
  | SetIndexesRequest
  | GetFragmentRequest
  | SetDOMBookRequest;

//===============================\\
//            RESPONSE           \\
//===============================\\

export interface GetIndexesResponse extends WorkerResponse<{ 
  control: TMWorkerControls.GetIndexes, 
  payload: TMIndexes, status: ResponseStatus,
  requestId: string;
}> {}
  
export interface SetIndexesResponse extends WorkerResponse<{ 
  control: TMWorkerControls.SetIndexes, 
  payload: null, 
  status: ResponseStatus,
  requestId: string;
}> {}

export interface GetFragmentResponse extends WorkerResponse<{ 
  control: TMWorkerControls.GetFragment, 
  payload: string, 
  status: ResponseStatus,
  requestId: string;
}> {}

export interface SetDOMBookResponse extends WorkerResponse<{ 
  control: TMWorkerControls.SetDOMBook, 
  payload: null, 
  status: ResponseStatus,
  requestId: string;
}> {}

export interface InitTMResponse extends WorkerResponse<{ 
  control: TMWorkerControls.InitTM, 
  payload: null, 
  status: ResponseStatus,
  requestId: string;
}> {}

export type TMWorkerResponseList = 
  | GetIndexesResponse 
  | SetIndexesResponse 
  | GetFragmentResponse 
  | SetDOMBookResponse
  | InitTMResponse;