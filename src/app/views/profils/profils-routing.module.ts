import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [  
  {  path: '',
  data: {
    title: 'profils'
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'profils'
    },
    {
      path: 'profil',
      component: ProfilComponent,
      data: {
        title: 'Profil'
      }
    },

    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilsRoutingModule { }
