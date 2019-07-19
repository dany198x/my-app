import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { MobxComponent } from './mobx/mobx.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
  { path: 'hero', component: HeroComponent },
  { path: 'hero/:id', component: HeroComponent },
  { path: 'mobx', component: MobxComponent },
  { path: 'rxjs', component: RxjsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
