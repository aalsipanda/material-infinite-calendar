import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CalendarModule } from './calendar/calendar.module';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, CalendarModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
