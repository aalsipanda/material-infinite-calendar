import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

enum ArrayEnd {
  FRONT,
  BACK
}

@Injectable()
export class CalendarDaysService {

  public days$: BehaviorSubject<Date[]>;

  constructor() {
    this.days$ = new BehaviorSubject<Date[]>(this._initialDays);
  }

  public get todayIndex(): number {
    const today = new Date().toDateString();
    return this.days$.value.findIndex((day: Date) => {
      const date = day.toDateString();
      return date === today;
    })
  }

  public addPastDays(numDays: number): void {
    let days: Date[] = this.days$.value;
    const currentFirstDay: Date = days[0];
    for (let i = 0; i <= numDays; i++) {
      days.push(this.getPastDate(currentFirstDay, i))
    }
    this.days$.next(days);
  }

  public addFutureDays(numDays: number): void {
    let days: Date[] = this.days$.value;
    const currentLastDay: Date = days.slice(-1)[0];
    for (let i = 0; i <= numDays; i++) {
      days.push(this.getFutureDate(currentLastDay, i))
    }
    this.days$.next(days);
  }

  private get _initialDays(): Date[] {
    const days: Date[] = [];
    const oneMonthAgo = this.getPastDate(new Date(), 30)
    const oneMonthFromNow = this.getFutureDate(new Date(), 30);
    for (let i = 0; i < 60; i++) {
      days.push(this.getFutureDate(oneMonthAgo, i));
    }
    return days;
  }

  private getPastDate(date: Date, days: number): Date {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  private getFutureDate(date: Date, days: number): Date {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}