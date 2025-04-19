import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export const DIALOGS_CLOSED = new InjectionToken<Observable<void>>('DIALOGS_CLOSED')