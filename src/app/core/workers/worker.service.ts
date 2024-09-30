import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { WorkerRequest, WorkerResponse } from "./worker.types";

export enum Workers {
  FileWorker = "FileWorker",
  TMWorker = "TMWorker",
}

@Injectable({
  providedIn: 'root',
})

export class WorkerService {
  private workers = new Map<Workers | string, Worker>();
  private pendingRequests: Map<string, (response: WorkerResponse) => void> = new Map();

  constructor() {}

  request<T extends WorkerResponse>(request: WorkerRequest): Observable<T> {
    const responseSubject = new Subject<T>();

    const waitPendingFn = (response: WorkerResponse) => {
      responseSubject.next(response as T);
      responseSubject.complete(); 
    };

    this.workers.get(request.worker)?.postMessage(request);
    this.pendingRequests.set(request.requestId, waitPendingFn);
    return responseSubject.asObservable();
  }

  init() {
    return () => {
      if (typeof Worker !== 'undefined') {
        this.workers.set(
          Workers.TMWorker, 
          new Worker(new URL(`./text-manager-worker/text-manager.worker`, import.meta.url)
        ))

        this.workers.set(
          Workers.FileWorker, 
          new Worker(new URL(`./file-worker/file.worker`, import.meta.url)
        ))
      }

      this.workers.forEach(worker => {
        if (worker) {
          worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
            const { requestId } = event.data;
            const pendingFn = this.pendingRequests.get(requestId);

            if (pendingFn) {
                pendingFn(event.data);
            }
          };
        }
      });

      return Promise.resolve(true)
    }
  }
}

