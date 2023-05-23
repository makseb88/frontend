import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilsRoutingModule } from './profils-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { ModalModule,ButtonModule,FormModule,GridModule  } from '@coreui/angular';
import { ProfileService } from '../../services/profile/ProfileService';
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [

    ProfilComponent,

  ],
  providers: [
    // Other providers
    ProfileService
  ],
  imports: [
    CommonModule,
    ProfilsRoutingModule,
    ModalModule,
    ButtonModule,
    FormModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule,
    

  ]
})
export class ProfilsModule { }
