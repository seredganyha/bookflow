import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeService } from './core/services/theme.service';
import { WorkerService } from './core/workers/worker.service';

import { WORKER_DEFINITIONS, WORKER_DEFINITIONS_PROVIDERS } from './core/workers/workers.provide';
import { WorkerDefinition } from './core/workers/worker.types';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet, 
    CommonModule,
  ],
  providers: [
    WORKER_DEFINITIONS_PROVIDERS,
    { 
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => themeService.init(),
      deps: [ThemeService], 
      multi: true 
    },
    { 
      provide: APP_INITIALIZER,
      useFactory: (workerService: WorkerService, workers: WorkerDefinition[]) =>  workerService.init(workers),
      deps: [WorkerService, WORKER_DEFINITIONS], 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
