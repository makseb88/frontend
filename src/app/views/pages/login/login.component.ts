import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

   constructor(private loginService: LoginService) { }
   login(): void {
    this.loginService.login(this.email, this.password)
      .subscribe(
        response => {
          // Handle successful login response
          console.log(response);
        },
        error => {
          // Handle login error
          console.error(error);
        }
      );
  }
}
