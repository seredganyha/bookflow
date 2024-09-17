import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeService } from './core/services/theme.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet, 
    SettingsModule, 
    CommonModule,
  ],
  providers: [
    { 
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => themeService.init,
      deps: [ThemeService], 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
