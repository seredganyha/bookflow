import { ResponseBase } from "../worker.types";

export function sendResponse<T extends ResponseBase>(response: T) {
  self.postMessage(response);
}

export function createResponse<T extends ResponseBase>(response: T): T {
  return response;
}