import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { AllrestaurantComponent } from './allrestaurant/allrestaurant.component';


@NgModule({
  declarations: [
    AllrestaurantComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
