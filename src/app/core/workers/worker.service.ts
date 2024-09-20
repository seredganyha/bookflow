import { Injectable } from "@angular/core";
import { RequestBase, ResponseBase, WorkerRequest, Workers } from "./worker.types";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private workers = new Map<Workers, Worker>();
  private pendingRequests: Map<string, (response: ResponseBase) => void> = new Map();

  constructor() {

    this.init()

    this.workers.forEach(worker => {
      if (worker) {
        worker.onmessage = (event: MessageEvent<ResponseBase>) => {
          const { requestId } = event.data;
          const pendingFn = this.pendingRequests.get(requestId);

          if (pendingFn) {
              pendingFn(event.data);
          }
        };
      }
    });
  }

  request<T extends RequestBase>(request: WorkerRequest<T>) {
    const responseSubject = new Subject<ResponseBase>();

    const waitPendingFn = (response: ResponseBase) => {
      responseSubject.next(response);
      responseSubject.complete(); 
    };

    this.workers.get(request.worker)?.postMessage(request);
    this.pendingRequests.set(request.requestId, waitPendingFn)
    return responseSubject.asObservable();
  }

  init() {
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
  }
}


