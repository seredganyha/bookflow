import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, tap } from "rxjs";
import { Theme } from "../types/theme";
import { CURRENT_THEME, СurrentThemeProvider } from "../core/tokens/theme-token";
import { ThemeService } from "../core/services/theme.service";
import { Settings } from "../types/settings";

@Injectable()
export class SettingsService {
  private readonly fragmentsResend$ = new BehaviorSubject<number>(12);
  private readonly fragmentsChar$ = new BehaviorSubject<number>(10000);

  readonly settings$: Observable<Settings> = combineLatest
    (
      [
        this.fragmentsResend$, 
        this.fragmentsChar$, 
        this.currentTheme$
      ]
    )
    .pipe(
      map(([fragmentsResendInterval, fragmentCharLimit, currentTheme]) => ({
          fragmentsResendInterval,
          fragmentCharLimit,
          currentTheme
       })
      )
    )

  constructor(
    @Inject(CURRENT_THEME) private readonly currentTheme$: СurrentThemeProvider,
    private themeService: ThemeService
  ) {}

  public setFragmentsResendInterval(value: number): void {
    this.fragmentsResend$.next(value);
  }

  public setFragmentCharLimit(value: number): void {
    this.fragmentsChar$.next(value);
  }

  public setTheme(theme: Theme): void {
    this.themeService.setTheme(theme)
  }
}