import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings.service';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../shared/ui/select/select.component';
import { CURRENT_THEME_PROVIDERS, THEMES_PROVIDERS } from '../core/providers/theme.provider';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SelectComponent
  ],
  providers: [ 
    SettingsService,
    CURRENT_THEME_PROVIDERS,
    THEMES_PROVIDERS,
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
