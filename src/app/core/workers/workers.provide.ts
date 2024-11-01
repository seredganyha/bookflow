import { InjectionToken, Provider } from "@angular/core";
import { WorkerDefinition, Workers } from "./worker.types";

const workers: WorkerDefinition[] = [
  { name: Workers.BookWorker, workerClass: new Worker(new URL(`./book-worker/book.worker`, import.meta.url))},
];

export const WORKER_DEFINITIONS = new InjectionToken<Iterable<WorkerDefinition>>('WorkerDefinitions');

export const WORKER_DEFINITIONS_PROVIDERS: Provider[] = [
  {
    provide: WORKER_DEFINITIONS,
    useValue: workers,
  },
];