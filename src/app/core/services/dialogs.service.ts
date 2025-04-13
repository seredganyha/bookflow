import { inject, Injectable, InjectionToken, Injector, INJECTOR, Signal, signal, Type, WritableSignal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Context<Input, Output> {
  data: Input,
  isOpen: WritableSignal<boolean>,
  closed: Subject<null>,
  done: WritableSignal<null | Output>
}

interface DialogItem {
  component: Type<unknown>,
  isOpen: Signal<boolean>,
  injector: Injector
}

interface CustomDialog<Output = any> {
  show: () => void,
  isOpen: Signal<boolean>,
  done: Signal<Output | null>
}

export const DialogContext = new InjectionToken('DialogContext');

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  private _dialogs = new BehaviorSubject<DialogItem[]>([])
  public dialogs = this._dialogs.asObservable()

  add<Input = undefined, Output = undefined>(dialog: Type<unknown>, data?: Input): CustomDialog<Output> {

    const closed = new Subject<void>()
    const done = signal<null | Output>(null)

    const isOpen = signal(false)

    const injector = Injector.create({ providers: [{
      provide: DialogContext,
      useValue: {
        data: data,
        closed,
        isOpen,
        done
      }
    }]})

    const dialogTemp: DialogItem[] = [...this._dialogs.value, {
        component: dialog,
        isOpen,
        injector
      }]

    this._dialogs.next(dialogTemp)
    
    return {
      show: () => {
        isOpen.set(true)
      },
      isOpen: isOpen.asReadonly(),
      done: done.asReadonly(),
    }
  }

  // TODO REMOVE

  constructor() {}
}