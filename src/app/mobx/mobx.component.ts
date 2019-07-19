import { Component, OnInit } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { computed} from 'mobx-angular';
import { observable, autorun} from 'mobx';
import { Observable, Subject, of,fromEvent,interval } from 'rxjs';

@Component({
  selector: 'app-mobx',
  templateUrl: './mobx.component.html',
  styleUrls: ['./mobx.component.scss']
})
export class MobxComponent implements OnInit {

  appState: any;
  store: any;
  @observable index: any;
  plus: any;

  @computed
  get number() {
    return this.index;
  }

  constructor() {
    this.index = 0;
    this.store = {
      value: '0',
      computedValue: of('0')
    }

    autorun(() => {
      this.plus = computed(() => this.index > 0);
      console.log(this.store.value);
      console.log(this.store.computedValue);
      console.log(this.plus);
    });
  }

  action() {
    this.index = this.index + 1;
    this.store.computedValue = of(this.index);
    console.log('');
    this.store.value = this.index;
  }

  ngOnInit() {
    
  }

  action1(params = this.index) {
    console.log(params);
  }
}
