import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BODY } from '../tokens/body-token';
import { CURRENT_THEME_SUBJECT } from '../tokens/current-theme-token';
import { Theme } from '../../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  constructor(
    @Inject(CURRENT_THEME_SUBJECT) private currentTheme$: BehaviorSubject<Theme>,
    @Inject(BODY) private bodyRef: HTMLElement,
  ) {}

  get currentTheme(): Theme {
    return this.currentTheme$.getValue();
  }

  setTheme(theme: Theme): void {
    this.currentTheme$.next(theme);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === Theme.Base ? Theme.Dark : Theme.Base;
    this.bodyRef.setAttribute('data-theme', newTheme);
    this.setTheme(newTheme);
  }
}