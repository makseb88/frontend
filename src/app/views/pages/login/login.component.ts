import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {LoginResponse } from '../../../modles/login-response.model'
import {User } from '../../../modles/user'
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

export class PasswordValidators {
  // static confirmPassword(control: AbstractControl): ValidationErrors | null {
  //   const password = control.get("password");
  //   const confirm = control.get("confirmPassword");
  //   if (password?.valid && password?.value === confirm?.value) {
  //     confirm?.setErrors(null);
  //     return null;
  //   }
  //   confirm?.setErrors({ passwordMismatch: true });
  //   return { passwordMismatch: true };
  // }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage!: string;
  email!: string;
  password!: string;
  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  formControls!: string[];

   constructor(private loginService: LoginService ,private router: Router, private formBuilder: FormBuilder,
    public validationFormsService: ValidationFormsService) { this.formErrors = this.validationFormsService.errorMessages;
      // this.createForm(); 
    }
      // createForm() {
      //   this.simpleForm = this.formBuilder.group(
      //     {
      //       firstName: ["", [Validators.required]],
      //       lastName: ["", [Validators.required]],
      //       username: [
      //         "",
      //         [
      //           Validators.required,
      //           Validators.minLength(this.validationFormsService.formRules.usernameMin),
      //           Validators.pattern(this.validationFormsService.formRules.nonEmpty)
      //         ]
      //       ],
      //       email: ["", [Validators.required, Validators.email]],
      //       password: [
      //         "",
      //         [
      //           Validators.required,
      //           Validators.minLength(this.validationFormsService.formRules.passwordMin),
      //           Validators.pattern(this.validationFormsService.formRules.passwordPattern)
      //         ]
      //       ],
      //       confirmPassword: [
      //         "",
      //         [
      //           Validators.required,
      //           Validators.minLength(this.validationFormsService.formRules.passwordMin),
      //           Validators.pattern(this.validationFormsService.formRules.passwordPattern)
      //         ]
      //       ],
      //       accept: [false, [Validators.requiredTrue]]
      //     },
      //     { validators: [PasswordValidators.confirmPassword] }
      //   );
      //   this.formControls = Object.keys(this.simpleForm.controls);
      // }
    
      // onReset() {
      //   this.submitted = false;
      //   this.simpleForm.reset();
      // }
    
      // onValidate() {
      //   this.submitted = true;
    
      //   // stop here if form is invalid
      //   return this.simpleForm.status === "VALID";
      // }
    
      // onSubmit() {
      //   console.warn(this.onValidate(), this.simpleForm.value);
    
      //   if (this.onValidate()) {
      //     // TODO: Submit form value
      //     console.warn(this.simpleForm.value);
      //     alert("SUCCESS!");
      //   }
      // }
   login(): void {
    this.loginService.login(this.email, this.password)
      .subscribe(
        (response: LoginResponse) => {
          // Handle successful login response
          const token = response.token;
          const userData = response.user;
          const user: User = {
            _id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            phoneNumber: userData.phoneNumber,
            role: userData.role,
            createdAt: userData.createdAt,
            status: userData.status,
            image: userData.image,
            stores: userData.stores,
           
            // Assign other user properties as needed
          };
          console.log(user);
          console.log(token);
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
