import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import {ScrollingModule as ExperimentalScrollingModule} from '@angular/cdk-experimental/scrolling';

import { CalendarComponent } from './calendar.component';
import { CalendarDaysService } from './calendar-days.service';
import { DayComponent } from './day.component';

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    ExperimentalScrollingModule
  ],
  declarations: [
    CalendarComponent,
    DayComponent
  ],
  entryComponents: [
    CalendarComponent
  ],
  exports: [
    CalendarComponent
  ],
  providers: [
    CalendarDaysService
  ]
})
export class CalendarModule {};