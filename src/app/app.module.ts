import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeService } from './core/services/theme.service';
import { WorkerService } from './core/workers/worker.service';
import { AppRoutingModule } from './app-routing.module';
import { WORKER_DEFINITIONS, WORKER_DEFINITIONS_PROVIDERS } from './core/workers/workers.provide';
import { WorkerDefinition } from './core/workers/worker.types';
import { DialogsPortalComponent } from './core/components/dialogs-portal/dialogs-portal.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet, 
    CommonModule,
    AppRoutingModule,
    DialogsPortalComponent
  ],
  providers: [
    WORKER_DEFINITIONS_PROVIDERS,
    provideAppInitializer(() => {
        const initializerFn = ((themeService: ThemeService) => themeService.init())(inject(ThemeService));
        return initializerFn();
      }),
    provideAppInitializer(() => {
        const initializerFn = (
          (workerService: WorkerService, workers: WorkerDefinition[]) =>  workerService.init(workers))
          (inject(WorkerService), inject(WORKER_DEFINITIONS)
      );
        return initializerFn();
      }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
