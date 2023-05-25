import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllrestaurantComponent } from './allrestaurant/allrestaurant.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Stores'
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'restaurant'
    },
    {
      path: 'allstore',
      component: AllrestaurantComponent,
      data: {
        title: 'All Stores'
      }
    },
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
