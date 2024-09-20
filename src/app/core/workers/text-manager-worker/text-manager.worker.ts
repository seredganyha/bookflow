/// <reference lib="webworker" />

import { createResponse, sendResponse } from "../utils/worker-response.utils";
import { ResponseStatus } from "../worker.types";
import { DOMParser } from "xmldom";

import {
  GetFragmentResponse,
  GetIndexesResponse,
  InitTMResponse,
  RequestedTMOptions,
  TMIndexes,
  TMWorkerControls,
  TMWorkerRequestList, 
} from "./tm-worker.types";

import {QueueNode, TextManager} from "text-manager"

const queueNode = new QueueNode();
let textManager: TextManager;


self.onmessage = (event: MessageEvent<TMWorkerRequestList>) => {
  const { control, payload, requestId } = event.data;

  switch (control) {
    case TMWorkerControls.GetIndexes:
      getIndexesHandler(requestId);
      break;
    case TMWorkerControls.SetIndexes:
      setIndexesHandler(payload, requestId);
      break;
    case TMWorkerControls.GetFragment:
      getFragmentHandler(requestId);
      break;
    case TMWorkerControls.InitTM:
      initTextManagerHandler(payload, requestId)
  }
};

const setIndexesHandler = (indexes: TMIndexes, requestId: string) => {
  textManager.setIndexes(indexes);

  const response = createResponse<InitTMResponse>({
    control: TMWorkerControls.InitTM,
    requestId,
    status: ResponseStatus.Success,
  })

  sendResponse(response);
}

const getIndexesHandler = (requestId: string) => {
  let indexes: TMIndexes | undefined;

  if (textManager) {
    textManager.getIndexes()
  }

  const response = createResponse<GetIndexesResponse>({
    control: TMWorkerControls.GetIndexes,
    payload: indexes,
    status: indexes ? ResponseStatus.Success: ResponseStatus.Error,
    requestId
  })

  sendResponse(response)
}

const getFragmentHandler = (requestId: string) => {
  let fragment!: string | undefined;

  if (textManager) {
    let fragment = textManager.getText();
  }

  const response = createResponse<GetFragmentResponse>({
    control: TMWorkerControls.GetFragment,
    payload: fragment,
    status: fragment ? ResponseStatus.Success: ResponseStatus.Error,
    requestId
  })

  sendResponse(response)
}

const initTextManagerHandler = (options: RequestedTMOptions, requestId: string) => {
  const dom = new DOMParser().parseFromString(options.textDocument, "application/xml");

  textManager = new TextManager(dom, queueNode, options.maxChar, options.indexes);

  const response = createResponse<InitTMResponse>({
    control: TMWorkerControls.InitTM,
    requestId,
    status: ResponseStatus.Success,
  })

  sendResponse(response);
}

