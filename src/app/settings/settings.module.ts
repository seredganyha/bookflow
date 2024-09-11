import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings.service';
import { SettingsComponent } from './settings.component';
import { ThemeService } from '../core/services/theme.service';
import { CURRENT_THEME } from '../core/tokens/theme-token';
import { ReactiveFormsModule } from '@angular/forms';
import { THEMES } from '../core/tokens/themes-token';
import { SelectComponent } from '../shared/ui/select/select.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectComponent
  ],
  providers: [ 
    SettingsService,     
    {
      provide: CURRENT_THEME,
      useFactory: (themeService: ThemeService) => themeService.currentTheme$,
      deps: [ThemeService]
    },
    {
      provide: THEMES,
      useFactory: (themeService: ThemeService) => themeService.themes$,
      deps: [ThemeService]
    } 
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
