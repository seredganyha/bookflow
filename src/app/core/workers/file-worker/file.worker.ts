import { createResponse, sendResponse } from "../utils/worker-response.utils";
import { ResponseStatus } from "../worker.types";
import { FileWorkerControls, FileWorkerRequestList, ReadFileResponse } from "./file-worker.types";

self.onmessage = async (event: MessageEvent<FileWorkerRequestList>) => {
  const { requestId, control, payload } = event.data;

  switch(control) {
    case FileWorkerControls.ReadFile: 
      readFileHandler(payload, requestId);
  }
};

const fileToText = async (file: File): Promise<string> => {
  return await file.text();
};

const readFileHandler = async (file: File , requestId: string): Promise<void> => {
  const fileText: string = await fileToText(file);

  const response =  createResponse<ReadFileResponse>({
    control: FileWorkerControls.ReadFile,
    payload: fileText,
    status: ResponseStatus.Success,
    requestId
  });

  sendResponse(response);
}