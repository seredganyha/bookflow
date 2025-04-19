import { inject, Injectable, InjectionToken, Injector, Signal, signal, Type, WritableSignal } from '@angular/core';
import { BehaviorSubject, exhaustMap, ignoreElements, Subject, tap } from 'rxjs';
import { DIALOGS_CLOSED } from '../tokens/dialogs-closed';

export interface Context<Input, Output> {
  data: Input,
  isOpen: WritableSignal<boolean>,
  closed: Subject<null>,
  done: WritableSignal<null | Output>
}

interface DialogItem {
  component: Type<unknown>,
  isOpen: WritableSignal<boolean>,
  injector: Injector
}

interface CustomDialog<Output = unknown> {
  show: () => void,
  isOpen: Signal<boolean>,
  done: Signal<Output | null>
}

export const DialogContext = new InjectionToken('DialogContext');

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  private readonly dialogsClosed$ = inject(DIALOGS_CLOSED, {optional: true})
  private _dialogs = new BehaviorSubject<DialogItem[]>([])
  public dialogs$ = this._dialogs.asObservable()

  constructor() {
    if(this.dialogsClosed$) {
      this.dialogsClosed$.pipe(
        exhaustMap(() => this.dialogs$),
        tap((dialogs) => {
          dialogs.forEach(dialog => dialog.isOpen.set(false))
        }),
        ignoreElements()
      )
      .subscribe()
    }
  }

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
}