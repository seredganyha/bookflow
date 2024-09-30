/// <reference lib="webworker" />

import { TextManager } from "text-manager";
import { control, worker } from "../base.worker";
import { TMIndexes, TMWorkerCommands, TMWorkerControls } from "./tm-worker.types";

@worker
class TMWorker implements TMWorkerControls {
  private textManager: TextManager;

  constructor() {
    this.textManager = new TextManager();
  }

  @control(TMWorkerCommands.SetIndexes)
  setIndexes (indexes: TMIndexes) {
    this.textManager.setIndexes(indexes);
  }

  @control(TMWorkerCommands.GetIndexes)
  getIndexes() {
    return this.textManager.getIndexes();
  }

  @control(TMWorkerCommands.GetFragment)
  getFragment() {
    return this.textManager.getText()
  }

  @control(TMWorkerCommands.SetBook)
  setBook(file: string) {
    this.textManager.setFile(file);
  }
}

new TMWorker()