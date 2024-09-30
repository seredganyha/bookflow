import { control, worker,  } from "../base.worker";
import { FileWorkerCommands } from "./file-worker.types";


@worker
class FileWorker {

  @control(FileWorkerCommands.ReadFile)
  async readFile (file: File) {
    return await this.fileToText(file);;
  }
  
  private async fileToText (file: File): Promise<string> {
    return await file.text();
  }
}

new FileWorker();
