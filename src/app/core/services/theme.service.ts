import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BODY } from '../tokens/body-token';
import { Theme } from '../../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly currentTheme$ = new BehaviorSubject<Theme>(Theme.Base);

  constructor(@Inject(BODY) private bodyRef: HTMLElement) {
    this.currentTheme$.subscribe((theme) => this.bodyRef.setAttribute('data-theme', theme))
  }

  setTheme(theme: Theme): void {
    this.currentTheme$.next(theme);
  }

  get currentTheme() {
    return this.currentTheme$;
  }

  private getNextTheme(theme: Theme): Theme {
    return theme === Theme.Base ? Theme.Dark : Theme.Base;
  }

  toggleTheme(): void {
    const nextTheme = this.getNextTheme(this.currentTheme.value);
    this.setTheme(nextTheme);
  }
}