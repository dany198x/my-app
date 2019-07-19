import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobxComponent } from './mobx.component';

describe('MobxComponent', () => {
  let component: MobxComponent;
  let fixture: ComponentFixture<MobxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
