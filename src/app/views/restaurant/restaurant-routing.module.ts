import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllrestaurantComponent } from './allrestaurant/allrestaurant.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'restaurant'
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'restaurant'
    },
    {
      path: 'allrestaurant',
      component: AllrestaurantComponent,
      data: {
        title: 'All Restaurant'
      }
    },
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
