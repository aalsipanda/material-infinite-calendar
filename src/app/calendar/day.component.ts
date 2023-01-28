import { Component, Input, OnInit, AfterViewInit, AfterViewChecked, OnChanges } from '@angular/core';

@Component({
  selector: 'calendar-day',
  template: `
    <div [style.minHeight.px]="100">
      {{ day.getMonth()+1 }}/{{ day.getDate() }}
      <div *ngFor="let activity of activities; let i = index" class="activity">
        Activity {{ i+1 }}
      </div>
    </div>
  `,
  styles: [
    `
    .activity {
      height: 100px;
      background: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px;
    }
    `
  ]
})
export class DayComponent implements OnChanges {
  @Input() day: Date;

  activities: any[];

  ngOnChanges() {
    const numActivities = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    this.activities = new Array(numActivities);

  }
}