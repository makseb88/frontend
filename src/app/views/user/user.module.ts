import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, UtilitiesModule,ModalModule,ButtonModule,FormModule  } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { OwnerComponent } from './owner/owner.component';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProfilComponent } from './profils/profil/profil.component';

@NgModule({
  declarations: [
    OwnerComponent,
    ProfilComponent
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
    
  ],
  providers: [
    IconSetService
  ],

})
export class UserModule { }
