import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BODY } from '../tokens/body-token';
import { Theme } from '../../types/theme';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly initialTheme: Theme = this.storeService.getLocalStorageValueOrInitial<Theme>("currentTheme", Theme.Dark);

  private readonly currentThemeSource$ = new BehaviorSubject<Theme>(this.initialTheme);
  readonly currentTheme$ = this.currentThemeSource$.asObservable();
  private readonly themesSource = new BehaviorSubject<Theme[]>(Object.values(Theme))
  readonly themes$ = this.themesSource.asObservable();

  constructor(
    @Inject(BODY) private bodyRef: HTMLElement,
    private storeService: StoreService,
  ) {
    this.currentThemeSource$.subscribe((theme: Theme) => this.updateElementTheme(this.bodyRef, theme)); 
  }

  init() {
    return () => {
      return new Promise<void>((resolve) => {
        const initialTheme = this.storeService.getLocalStorageValueOrInitial<Theme>('currentTheme', Theme.Dark);
        this.setTheme(initialTheme);
        resolve();
      });
    }
  }
  
  setTheme(theme: Theme): void {
    this.currentThemeSource$.next(theme);
    this.storeService.saveToLocalStorage("currentTheme", theme);
  }

  updateElementTheme(elemRef: HTMLElement, theme: Theme): void {
    requestAnimationFrame(() => elemRef.setAttribute('data-theme', theme));
  }

  private getNextTheme(theme: Theme): Theme {
    return theme === Theme.Base ? Theme.Dark : Theme.Base;
  }

  toggleTheme(): void {
    const nextTheme = this.getNextTheme(this.currentThemeSource$.value);
    this.setTheme(nextTheme);
  }
}