import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SettingsService } from './settings.service';
import { Theme } from '../types/theme';
import { THEMES } from '../core/tokens/themes-token';
import { Observable } from 'rxjs';
import { CURRENT_THEME } from '../core/tokens/theme-token';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  readonly settings$ = this.settingsService.settings$;
  
  constructor(
    private settingsService: SettingsService,
    @Inject(THEMES) public themes$: Observable<string[]>,
    @Inject(CURRENT_THEME) public currentTheme$: Observable<string>,
  ) {}

  onResendIntervalChange(interval: string): void {
    this.settingsService.setFragmentsResendInterval(Number(interval));
  }

  onCharLimitChange(charLimit: string): void {
    this.settingsService.setFragmentCharLimit(Number(charLimit)); 
  }

  onThemeChange(theme: string): void {
    this.settingsService.setTheme(theme as Theme); 
  }
}

