import { inject, InjectionToken } from "@angular/core";
import { WINDOW } from "./window-token";

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage', {
  providedIn: 'root',
  factory: () => inject(WINDOW).localStorage,
});

