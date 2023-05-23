import { Component } from '@angular/core';
import { User} from '../../../../modles/user'
import {AuthService} from '../../../../services/authservice'
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit   {
  user: User = {} as User; // Initialize with an empty User object
constructor(  private router: Router , private authService: AuthService) {
    
    
  }

  ngOnInit( ): void {
    const user = this.authService.getUser();
    if (user !== null) {
      this.user = user;
      
    } else {
      // Handle the case when the user is null
      console.log("error");
    }
  }


}
