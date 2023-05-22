import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthService} from '../../../services/authservice'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private router: Router,private classToggler: ClassToggleService, private authService: AuthService) {
    super();
    
  }
  logout(): void {
    this.router.navigateByUrl('/logout');
  }
  
 
}
