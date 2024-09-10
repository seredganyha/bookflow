import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BODY } from '../tokens/body-token';
import { Theme } from '../../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly currentThemeSource$ = new BehaviorSubject<Theme>(Theme.Base);
  readonly currentTheme$ = this.currentThemeSource$.asObservable();
  private readonly themesSource = new BehaviorSubject<Theme[]>(Object.values(Theme))
  readonly themes$ = this.themesSource.asObservable();

  constructor(@Inject(BODY) private bodyRef: HTMLElement) {
    this.currentTheme$.subscribe((theme) => this.bodyRef.setAttribute('data-theme', theme))
  }

  setTheme(theme: Theme): void {
    this.currentThemeSource$.next(theme);
  }

  private getNextTheme(theme: Theme): Theme {
    return theme === Theme.Base ? Theme.Dark : Theme.Base;
  }

  toggleTheme(): void {
    const nextTheme = this.getNextTheme(this.currentThemeSource$.value);
    this.setTheme(nextTheme);
  }
}