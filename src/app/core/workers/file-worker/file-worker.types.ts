import { RequestBase, ResponseStatus, WorkerResponse } from "../worker.types";

export enum FileWorkerControls {
  ReadFile = 'readFile',
}

export interface ReadFileRequest extends RequestBase {
  control: FileWorkerControls.ReadFile;
  payload: File;
}

export interface ReadFileResponse extends WorkerResponse<{
  control: FileWorkerControls.ReadFile,
  payload: string;
  status: ResponseStatus,
  requestId: string;
}> {}

export type FileWorkerRequestList = 
  | ReadFileRequest

export type FileWorkerResponseList = 
  | ReadFileResponse