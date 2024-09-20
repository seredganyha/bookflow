import { inject, InjectionToken } from "@angular/core";
import { WINDOW } from "./window-token";


export const DOCUMENT = new InjectionToken<Document>('DOCUMENT', {
  providedIn: 'root',
  factory: () => inject(WINDOW).document,
});