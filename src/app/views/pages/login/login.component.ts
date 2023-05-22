import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {LoginResponse } from '../../../modles/login-response.model'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage!: string;
  email!: string;
  password!: string;

   constructor(private loginService: LoginService ,private router: Router,) { }
   login(): void {
    this.loginService.login(this.email, this.password)
      .subscribe(
        (response: LoginResponse) => {
          // Handle successful login response
          const token = response.token;
          const user = response.user;
          console.log(user);
          // Save user information in session storage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']); // Redirect to the dashboard route
        },
        error => {
          // Handle login error
          // console.error(error);
          if (error.error && error.error.message) {
            console.error(error.error.message);
            this.errorMessage = error.error.message;
            
          } else {
            console.error('An error occurred during login.');
            this.errorMessage = 'An error occurred during login.';
          }
        }
      );
  }
}
