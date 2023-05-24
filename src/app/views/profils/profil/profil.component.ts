import { Component } from '@angular/core';
import { User} from '../../../modles/user'
import {AuthService} from '../../../services/authservice'
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/ProfileService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// export function MustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//           // return if another validator has already found an error on the matchingControl
//           return;
//       }

//       // set error on matchingControl if validation fails
//       if (control.value !== matchingControl.value) {
//           matchingControl.setErrors({ mustMatch: true });
//       } else {
//           matchingControl.setErrors(null);
//       }
//   }
// }
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit   {
  user: User = {} as User; // Initialize with an empty User object
  currentUser = JSON.parse(localStorage.getItem('user')!);
  firstName: string = this.currentUser.firstName;
  lastName: string = this.currentUser.lastName; // Initialize with the current name
  phoneNumber: string = this.currentUser.phoneNumber; // Initialize with the current phone number

  registerForm!: FormGroup;
  submitted = false;
constructor( private formBuilder: FormBuilder,private profileService: ProfileService, private router: Router , private authService: AuthService) {
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
    this.registerForm = this.formBuilder.group({
      // title: ['', Validators.required],
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      phoneNumber: [this.currentUser.phoneNumber, Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
  }, {
      // validator: MustMatch('password', 'confirmPassword')
  });
 
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
    

        return;
      }

      // display form values on success
      this.updateProfile();
 
    }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
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
          window.location.reload();


      

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
