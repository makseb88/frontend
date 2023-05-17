import { NgModule ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { AllrestaurantComponent } from './allrestaurant/allrestaurant.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    AllrestaurantComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
  ]
})
export class RestaurantModule   { }
