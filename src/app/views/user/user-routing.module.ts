import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OwnerComponent} from './owner/owner.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'user'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user'
      },
      {
        path: 'owner',
        component: OwnerComponent,
        data: {
          title: 'Owner'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
