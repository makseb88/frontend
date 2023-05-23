import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, UtilitiesModule,ModalModule,ButtonModule,FormModule  } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { OwnerComponent } from './owner/owner.component';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProfilComponent } from './profils/profil/profil.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { BadgeModule } from '@coreui/angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { FormsModule } from '@angular/forms';










@NgModule({
  declarations: [
    OwnerComponent,
    ProfilComponent,
    AddOwnerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    UtilitiesModule,
    ModalModule,
    ButtonModule ,
    FormModule,
    IconModule,
    Ng2SmartTableModule,
    HttpClientModule,
    MdbTabsModule,
    BadgeModule,
    NgbPaginationModule,
    FormsModule
    
        
    
  ],
  providers: [
    IconSetService
  ],

})
export class UserModule { }
