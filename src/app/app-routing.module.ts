import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationViewComponent } from './presentation-view/presentation-view.component';
import { PresentationEditComponent } from './presentation-edit/presentation-edit.component';
import { PresentationListComponent } from './presentation-list/presentation-list.component';


const routes: Routes = [
  { path: 'list' , component: PresentationListComponent },
  { path: 'edit/:name' , component: PresentationEditComponent },
  { path: 'view/:name' , component: PresentationViewComponent },
  { path: 'new' , component: PresentationEditComponent },
  { path: '' , redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
