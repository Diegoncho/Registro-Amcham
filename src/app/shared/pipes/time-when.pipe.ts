import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from '@angular/core';

// Inspirado en: AndrewPoyntz
// https://github.com/AndrewPoyntz/time-ago-pipe

@Pipe({
  name: 'timeWhen',
  pure: false
})
export class TimeWhenPipe implements PipeTransform, OnDestroy {

  private timer: number;
  private days = [ 'dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sáb'];
  private months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  transform(value: string) {
    this.removeTimer();
    const d = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;

    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));
    if (Number.isNaN(seconds)) {
      return '';
    } else if (hours <= 22) {
      const _h = this.fillZero(d.getHours());
      const _m = this.fillZero(d.getMinutes());
      return _h + ':' + _m;
    } else if (days <= 7) {
      return this.days[d.getDay()];
    } else {
        return this.fillZero(d.getDate()) + '/' + this.fillZero(d.getMonth() + 1) + '/' +  d.getFullYear().toString().substr(2, 2);
    }
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private fillZero(n: number) {
    return n < 10 ? '0' + n.toString() : n.toString();
  }

  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number) {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) { // less than 1 min, update every 2 secs
      return 5;
    } else if (seconds < hr) { // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) { // less then a day, update every 15 mins
      return 900;
    } else { // update every hour
      return 3600;
    }
  }
}
