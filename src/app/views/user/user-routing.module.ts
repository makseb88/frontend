import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OwnerComponent} from './owner/owner.component';
import { ProfilComponent } from './profils/profil/profil.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
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
      {
        path: 'addOwner',
        component: AddOwnerComponent,
        data: {
          title: 'addOwner'
        }
      },
      {
        path: 'profil',
        component: ProfilComponent,
        data: {
          title: 'Profil'
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
