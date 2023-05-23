import { Component } from '@angular/core';
import { User} from '../../../modles/user'
import {AuthService} from '../../../services/authservice'
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/ProfileService';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit   {
  user: User = {} as User; // Initialize with an empty User object
  firstName: string = '';
  lastName: string = ''; // Initialize with the current name
  phoneNumber: string = ''; // Initialize with the current phone number


constructor( private profileService: ProfileService, private router: Router , private authService: AuthService) {
  // const token = localStorage.getItem('token'); // Retrieve the token from storage

    
  }
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  ngOnInit( ): void {
     const token = localStorage.getItem('token'); // Retrieve the token from storage
console.log('token')
    const user = this.authService.getUser();
    if (user !== null) {
      this.user = user;
      
    } else {
      // Handle the case when the user is null
      console.log("error");
    }
  }
 
  updateProfile(): void {
    const token = localStorage.getItem('token'); // Retrieve the token from storage
    const storedData = localStorage.getItem('key');

    if (token) {
    this.profileService.updateProfile(this.firstName,this.lastName, this.phoneNumber,token)
      .subscribe(
        response => {
          // Handle successful profile update response
          console.log(response);
          
          var currentUser = JSON.parse(localStorage.getItem('user')!);
          currentUser.firstName=this.firstName;
          currentUser.lastName=this.lastName;
          currentUser.phoneNumber=this.phoneNumber;
          localStorage.setItem('user', JSON.stringify(currentUser));



          console.log(currentUser);


      

        },
        error => {
          // Handle profile update error
          console.error(error);
        }
      );
  }
  else{
    console.error('Token is missing or expired');
  }
}

}
