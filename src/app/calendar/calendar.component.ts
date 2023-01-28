import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment-timezone';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subject, BehaviorSubject } from 'rxjs';

import { CalendarDaysService } from './calendar-days.service';

@Component({
  selector: 'calendar',
  template: `
    <cdk-virtual-scroll-viewport
      class="demo-viewport"
      orientation="horizontal"
      autosize
      (onContentScrolled)="handleScrollChange($event)"
    >
      <calendar-day
        *cdkVirtualFor="let day of days; trackBy: trackByFn"
        [day]="day"
      ></calendar-day>
    </cdk-virtual-scroll-viewport>
    <button (click)="goToToday()">go</button>
  `,
  styles: [
    `
    .demo-viewport {
      height: 100%;
    }

    ::ng-deep .cdk-virtual-scroll-content-wrapper {
      display: flex;
      flex-direction: row;
    }
    `,
  ],
})
export class CalendarComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  public days: Date[];

  private _scrollingUp = new Subject<number>();
  private _scrollingDown = new Subject<number>();

  constructor(private _daysService: CalendarDaysService) {}

  ngOnInit() {
    this._daysService.days$.subscribe((days) => {
      if (this.days == days) {
        console.log('SAME OBJECT!!!');
      }
      this.days = [...days];
    });
    this.watchScroll();
    this.handleScrollingUp();
    this.handleScrollingDown();
  }

  goToToday() {
    this.viewport.scrollToIndex(this._daysService.todayIndex);
  }

  trackByFn(i): number {
    return i;
  }

  private watchScroll() {
    let currentOffset: number = 0;
    this.viewport.elementScrolled().subscribe((event) => {
      const newOffset = this.viewport.measureScrollOffset();
      if (newOffset === currentOffset) return;

      if (newOffset < currentOffset) {
        this._scrollingUp.next(newOffset);
      } else {
        this._scrollingDown.next(newOffset);
      }

      currentOffset = newOffset;
    });
  }

  private handleScrollingUp() {
    this._scrollingUp.subscribe((offset) => {
      const fromTop = this.viewport.measureScrollOffset('top');
      if (fromTop < 200) {
        this._daysService.addPastDays(15);
      }
    });
  }

  private handleScrollingDown() {
    this._scrollingDown.subscribe((offset) => {
      const fromBottom = this.viewport.measureScrollOffset('bottom');
      if (fromBottom < 200) {
        this._daysService.addFutureDays(15);
      }
    });
  }
}
