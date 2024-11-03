import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { InternalMessage, WorkerDefinition, WorkerRequest, WorkerResponse, Workers } from "./worker.types";
import { getUuid } from "../../shared/utils/utils";

@Injectable({
  providedIn: 'root',
})

export class WorkerService {
  private workers = new Map<Workers | string, Worker>();
  private pendingRequests: Map<string, (response: InternalMessage) => void> = new Map();

  constructor() {}

  request<T>(request: WorkerRequest, worker = Workers.BookWorker): Observable<WorkerResponse<T>> {
    const responseSubject = new Subject<WorkerResponse<T>>();

    const waitPendingFn = (response: InternalMessage) => {
      const {requestId, worker, ...res} = response
      
      responseSubject.next(res as WorkerResponse<T>);
      responseSubject.complete(); 
    };

    const requestWithId = {...request, requestId: getUuid()}

    this.workers.get(worker)?.postMessage(requestWithId);
    this.pendingRequests.set(requestWithId.requestId, waitPendingFn);
    return responseSubject.asObservable();
  }

  promiseRequest<T>(request: WorkerRequest, worker: Workers = Workers.BookWorker): Promise<WorkerResponse<T>> {
    return new Promise((resolve, reject) => {
      const waitPendingFn = (response: WorkerResponse) => {
        resolve(response as WorkerResponse<T>);
      };

      const internalRequest = {...request, requestId: getUuid()}

      this.workers.get(worker)?.postMessage(internalRequest);
      this.pendingRequests.set(internalRequest.requestId, waitPendingFn);
    });
  }

  init(workers: WorkerDefinition[]) {
    return () => {
      if (typeof Worker !== 'undefined') {
        for (const { name, workerClass } of workers) {
          this.workers.set(name, workerClass)
        }
      }

      this.workers.forEach(worker => {
        worker.onmessage = (event: MessageEvent<InternalMessage>) => {
          const { requestId } = event.data;
          const pendingFn = this.pendingRequests.get(requestId);

          if (pendingFn) {
              pendingFn(event.data);
          }
        };
      });

      return Promise.resolve()
    }
  }
}

