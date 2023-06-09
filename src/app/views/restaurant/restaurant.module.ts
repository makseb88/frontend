import { NgModule ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { AllrestaurantComponent } from './allrestaurant/allrestaurant.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BadgeModule } from '@coreui/angular';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestStoreComponent } from './request-store/request-store.component';
import { TableModule, UtilitiesModule,ModalModule,ButtonModule,FormModule  } from '@coreui/angular';
import { RejectedStoreComponent } from './rejected-store/rejected-store.component';




@NgModule({
  declarations: [
    AllrestaurantComponent,
    RequestStoreComponent,
    RejectedStoreComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
    BadgeModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule, UtilitiesModule,ModalModule,ButtonModule,FormModule
  ]
})
export class RestaurantModule   { }
