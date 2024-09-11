import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SettingsModule } from './settings/settings.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
