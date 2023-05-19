import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthService} from '../../../services/authservice'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private authService: AuthService) {
    super();
    
  }
  
  ngOnInit(): void {
    this.authService.logout();
    // You can perform additional logout actions here, such as redirecting to the login page or displaying a success message
  }
}
