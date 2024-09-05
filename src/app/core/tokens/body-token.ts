import { inject, InjectionToken } from "@angular/core";
import { DOCUMENT } from "./document-token";

export const BODY = new InjectionToken<HTMLElement>('BODY', {
  providedIn: 'root',
  factory: () => inject(DOCUMENT).body,
});