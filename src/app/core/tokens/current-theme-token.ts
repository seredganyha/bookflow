import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../types/theme';

export const CURRENT_THEME_SUBJECT = new InjectionToken<BehaviorSubject<Theme>>('CURRENT_THEME_SUBJECT', {
  providedIn: 'root',
  factory: () => new BehaviorSubject<Theme>(Theme.Base),
});