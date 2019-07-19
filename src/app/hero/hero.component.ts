import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, of,fromEvent,interval } from 'rxjs';
import { switchMap,filter } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  paramValue$: Observable<any>;
  queryParamValue$: Observable<any>;
  paramId: Observable<any>;
  queryParamId: Observable<any>;

  ngOnInit() {
    console.log("this is nginit")
    //如果检测到路由相同而参数不同时，是不会重新初始化组件的
    this.paramValue$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.paramId = of(params.get('id'));
      })
    );
    this.paramValue$.subscribe(res => { console.log("id in param is",res) })

    this.queryParamValue$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        return this.queryParamId = of(params.get('id'));
      })
    );
    this.queryParamValue$.subscribe(res => { console.log("id in queryParam is", res) });
  }
  changeParams() {
    this.router.navigate(['/hero', 2]);
  }
  changeQueryParams() {
    this.router.navigate(['/hero', 3], {
      queryParams: {
        id: 'bbb',
      }
    });
  }
  keepQueryParams() {
    this.router.navigate(['/hero', 5], {
      queryParamsHandling: 'preserve',
    });
  }
}
