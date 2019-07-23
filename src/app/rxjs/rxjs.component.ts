import { Component, OnInit } from '@angular/core';
import { Observable, from, Subscription, interval, Subject, fromEvent, AsyncSubject } from 'rxjs';
import { take, filter, map, scan, mapTo, multicast, refCount } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor() { }
  subscription: Subscription;
  interval$: Observable<number>;


  ngOnInit() {
    // this.basicDemo();
    // this.observableDemo();
    this.subjectDemo();
    // this.operatorsDemo();
    // this.purityDemo()
  }

  basicDemo() {
    //from 转化数组，of转化多个参数
    //observable 可观察对象，表示可以调用的未来值或事件集合
    //需要被观察的数据都存在可观察对象中，如果被订阅，这些数据会按顺序被发送给观察者。
    let observable = from([1, 2, 3]);
    // let observable = of([1, 2, 3]);
    // let observable = of(1, 2, 3);
    //observer是观察者，是一组回调方法的集合，next方法决定了如何处理收到的数据，error和complete最多只会发生一次，且这两个不会同时发生。
    let observer = {
      next: (x) => { console.log(x) },
      error: (err) => { console.error(err) },
      complete: () => { console.log("completed") }
    }
    //以下这句语句代表了 观察者(observer) 订阅了(subscribe) 可观察对象(observable)，产生了一个订阅的记录(subscription) 。
    this.subscription = observable.subscribe(observer);
  }

  observableDemo() {
    //同一个可观察对象，被不同的观察者订阅后，都会完整的发出所有的数据。
    let observable = interval(1000);
    // let observable = from([1, 2, 3]);

    let observer1 = {
      next: (x) => { console.log("observer1: " + x) },
      error: (err) => { console.error(err) },
      complete: () => { console.log("observer1: completed") }
    }

    let observer2 = {
      next: (x) => { console.log("observer2: " + x) },
      error: (err) => { console.error(err) },
      complete: () => { console.log("observer2: completed") }
    }

    //可以看到可观察对象的订阅是同步的
    observable.subscribe(observer1);

    setTimeout(() => {
      observable.subscribe(observer2);
    }, 3000);

  }

  subjectDemo() {
    // let subject = new Subject<number>();

    // let observer1 = {
    //   next: (x) => { console.log("observer1: " + x) },
    //   error: (err) => { console.error(err) },
    //   complete: () => { console.log("observer1: completed") }
    // }

    // let observer2 = {
    //   next: (x) => { console.log("observer2: " + x) },
    //   error: (err) => { console.error(err) },
    //   complete: () => { console.log("observer2: completed") }
    // }

    // subject.subscribe(observer1);

    // let count = 0;

    // setInterval(() => {
    //   subject.next(count++);
    // }, 1000);

    // setTimeout(() => {
    //   subject.subscribe(observer2);
    // }, 3000);


    // const source = from([1, 2, 3]);
    // const subject = new Subject();

    // subject.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`)
    // });
    // subject.subscribe({
    //   next: (v) => console.log(`observerB: ${v}`)
    // });
    //source是可观察对象，以下语句代表了subject从source获取数据资源
    // source.subscribe(subject)

    // const source = interval(500);
    // const subject = new Subject();
    // const refCounted = source.pipe(multicast(subject), refCount());
    // let subscription1, subscription2;

    // // This calls `connect()`, because
    // // it is the first subscriber to `refCounted`
    // console.log('observerA subscribed');
    // subscription1 = refCounted.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`)
    // });

    // setTimeout(() => {
    //   console.log('observerB subscribed');
    //   subscription2 = refCounted.subscribe({
    //     next: (v) => console.log(`observerB: ${v}`)
    //   });
    // }, 600);

    // setTimeout(() => {
    //   console.log('observerA unsubscribed');
    //   subscription1.unsubscribe();
    // }, 1200);

    // // This is when the shared Observable execution will stop, because
    // // `refCounted` would have no more subscribers after this
    // setTimeout(() => {
    //   console.log('observerB unsubscribed');
    //   subscription2.unsubscribe();
    // }, 2000);

    const subject = new AsyncSubject();

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);

    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });

    subject.next(5);
    subject.complete();
  }

  operatorsDemo() {
    const ob = interval(1000);
    //pipe中可以连续使用多个操作符，操作符的顺序会对结果产生影响 
    this.interval$ = ob.pipe(map(n => n * 2), filter((n: number) => n % 10 == 0), take(3));
    this.interval$.subscribe(res => { console.log("take在后", res) });
    this.interval$ = ob.pipe(take(3), map(n => n * 2), filter((n: number) => n % 10 == 0));
    this.interval$.subscribe(res => { console.log("take在前", res) });
    this.interval$ = ob.pipe(filter((n: number) => n % 10 == 0), map(n => n * 2));
    this.interval$.subscribe(res => { console.log("filter在前", res) });
  }

  purityDemo() {
    // let count = 0;
    // document.addEventListener('click', () => console.log(`Clicked ${++count} times`));
    //rxjs中提倡全部使用纯函数，它所提供的操作符可以支持纯函数的使用
    //纯函数指的是函数执行的结果只和传入的参数有关。且没有副作用，副作用指的是对外部造成了变化
    //比如参数是一个对象，如果只利用对象的属性进行计算，那就无副作用，但如果修改对象的值，那外部的对象也改变了，需要注意
    fromEvent(document, 'click')
      .pipe(mapTo(1), scan((acc, count) => acc + count, 3))
      .subscribe(count => console.log(`Clicked ${count} times`));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

