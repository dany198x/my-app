import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, fromEvent, Subject } from 'rxjs';
import { map, filter, take, mapTo, scan,throttleTime } from 'rxjs/operators'
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, OnDestroy {

  constructor() { }
  interval$: Observable<number>;
  private searchText$ = new Subject<string>();

  ngOnInit() {
    const ob = interval(1000);
    //pipe中可以连续使用多个操作符，操作符的顺序会对结果产生影响 
    this.interval$ = ob.pipe(map(n => n * 2), filter((n: number) => n % 10 == 0), take(3));
    this.interval$.subscribe(res => { console.log("take在后", res) });
    this.interval$ = ob.pipe(take(3), map(n => n * 2), filter((n: number) => n % 10 == 0));
    this.interval$.subscribe(res => { console.log("take在前", res) });
    this.interval$ = ob.pipe(filter((n: number) => n % 10 == 0), map(n => n * 2));
    this.interval$.subscribe(res => { console.log("filter在前", res) });

    //scan的用法，做数值的累加，seed为初始值，one为每次接受到的值，acc为累积的值
    // const clicks = fromEvent(document, 'click');
    // const ones = clicks.pipe(mapTo(2));
    // const seed = 3;
    // const count = ones.pipe(scan((acc, one) => acc + one, seed), take(3));
    // count.subscribe({
    //   next: x => console.log('got value ' + x),
    //   error: err => console.error('something wrong occurred: ' + err),
    //   complete: () => console.log('done'),
    // });

    fromEvent(document, 'click')
      .pipe(
        throttleTime(1000),
        map(event => event['clientX']),
        scan((count, clientX) => count + clientX, 0)
      )
      .subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
      });
  }

  ngOnDestroy() {
  }
}
