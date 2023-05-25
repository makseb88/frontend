import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
@Component({
  selector: 'app-add-owner',
  templateUrl: 'add-owner.component.html',
  styleUrls: ['add-owner.component.scss']
})
export class AddOwnerComponent implements OnInit{

  position = 'top-end';
  visible = false;
  percentage = 0;

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: "",
    role: "owner",
    sexe: 'female'
  };
  registerForm!: FormGroup;
  submitted = false;

  ownerForm!: FormGroup;


  private apiUrl =environment.serverUrl + '/admin/addOwner';


  constructor(private http: HttpClient, private formBuilder: FormBuilder ,private router: Router,) {}

  toggleLiveDemo() {
    this.visible = !this.visible;

  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  redirect()
{
  setTimeout(() => {
    this.router.navigate(['user/owner']);
}, 2000);  //5s
 

}
  ngOnInit(): void {
    this.ownerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      
    },{
      validator: MustMatch('password', 'confirmPassword')
    }
    
    );
  }
  get f() { return this.ownerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ownerForm.invalid) {
  

      return;
    }

    // display form values on success
    this.addOwner();
    this.toggleToast()
    this.redirect()

  }
  addOwner() {
    // Vérification des mots de passe correspondants
   

    const ownerData = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      password: this.formData.password,
      phoneNumber: this.formData.phoneNumber,
      role: this.formData.role,
      sexe: this.formData.sexe
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    this.http.post<any>(this.apiUrl, ownerData, { headers }).subscribe(
      response => {
        // Gérer la réponse de succès
        console.log(response);
      },
      error => {
        // Gérer les erreurs
        console.error(error);
      }
    );
  }
}
