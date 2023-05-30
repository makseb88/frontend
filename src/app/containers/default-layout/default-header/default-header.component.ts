import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthService} from '../../../services/authservice'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { User} from '../../../modles/user';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  
  constructor(  
    private router: Router,
    private classToggler: ClassToggleService, 
    private authService: AuthService,
    private appComponent: AppComponent,
    private translate: TranslateService) {
      
    super();
    
  }
  user: User = {} as User; // Initialize with an empty User object


  ngOnInit( ): void {
    const user = this.authService.getUser();
    if (user !== null) {
      this.user = user;
    } else {
      // Handle the case when the user is null
    }
  }
 
  logout(): void {
    this.router.navigateByUrl('/logout');
  }

  switchLanguage(lang: string){
    this.translate.use(lang);
  }
  
 
}
