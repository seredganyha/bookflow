import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeService } from './core/services/theme.service';
import { WorkerService } from './core/workers/worker.service';


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
      useFactory: (themeService: ThemeService) => themeService.init(),
      deps: [ThemeService], 
      multi: true 
    },
    { 
      provide: APP_INITIALIZER,
      useFactory: (workerService: WorkerService) =>  workerService.init(),
      deps: [WorkerService], 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
