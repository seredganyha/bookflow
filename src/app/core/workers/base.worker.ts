import { Constructor, WorkerRequest, WorkerResponse } from "./worker.types";

export function control(control: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.controls) {
      target.controls = new Map();
    }

    target.controls.set(control, descriptor.value);
  };
}

export function worker<TBase extends Constructor>(Base: TBase) {

  return class extends Base {
    private controls!: Map<string, (...args: any[]) => any>;

    constructor(...args: any[]) {
      super(...args);

      self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
        const request = event.data;

        const { command, payload } = request;

        const handler = this.controls.get(command);

        if (handler) {
          const payloadRes = await handler(payload);
          const response = this.createResponse(payloadRes, request);
          this.sendResponse(response);
        }
      };

      for(let entry of this.controls) {
        this.controls.set(entry[0], entry[1].bind(this));
      }
    }

    createResponse(payload: any, request: WorkerRequest) {
      return {...request, payload};
    }

    sendResponse(response: WorkerResponse) {
      self.postMessage(response);
    }
  }
}