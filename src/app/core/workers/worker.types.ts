export interface WorkerMessage {
  readonly command: string;
}

export interface InternalMessage<T = unknown> extends WorkerMessage  {
  readonly requestId: string;
  readonly payload: T;
  readonly worker: string;
}

export interface WorkerRequest<T = unknown> extends WorkerMessage {
  readonly payload: T;
}

export interface WorkerResponse<T = unknown> extends WorkerMessage {
  readonly payload: T;
}

export type Constructor = new (...args: any[]) => {};

export const enum Workers {
  BookWorker = "BookWorker",
}

export interface WorkerDefinition {
  readonly name: string;
  readonly workerClass: Worker;
}