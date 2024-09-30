export interface WorkerMessage {
  command: string;
  worker: string;
  requestId: string;
}

export interface WorkerRequest<T = any> extends WorkerMessage {
  payload: T;
}

export interface WorkerResponse<T = any> extends WorkerMessage {
  payload: T;
}

export type Constructor = new (...args: any[]) => {};
