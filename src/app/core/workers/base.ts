import { Constructor, WorkerRequest, WorkerResponse } from "./worker.types";


export function control(control: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!target.controls) {
      // init controls here because the method decorator is processed before the class decorator
      // on new decorators it will be possible to use addInitializer
      target.controls = new Map();
    }

    target.controls.set(control, descriptor.value);
  };
}

export function worker<TBase extends Constructor>(Base: TBase) {

  return class extends Base {
    // init in @controls
    private controls!: Map<string, (...args: any[]) => any>;

    constructor(...args: any[]) {
      super(...args);

      self.onmessage = async (event: MessageEvent<WorkerResponse>) => {
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
        const [command, haldler] = entry;
        
        this.controls.set(command, haldler.bind(this));
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