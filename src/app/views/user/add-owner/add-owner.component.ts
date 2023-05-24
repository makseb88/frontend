import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-owner',
  templateUrl: 'add-owner.component.html',
  styleUrls: ['add-owner.component.scss']
})
export class AddOwnerComponent implements OnInit{
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

  ownerForm!: FormGroup;


  private apiUrl =environment.serverUrl + '/admin/addOwner';


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.ownerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  addOwner() {
    // Vérification des mots de passe correspondants
    if (this.formData.password !== this.formData.confirmPassword) {
      // Gérer l'erreur de mots de passe non correspondants
      return;
    }

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
