import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.scss']
})
export class AddOwnerComponent {
  ownerData: any = {};

  constructor(private http: HttpClient) {}

  addOwner(ownerData: any): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.post('/api/addOwner', ownerData, { headers }).subscribe(
      (response) => {
        // Handle success response
        console.log(response);
        // Provide feedback to the user (e.g., show a success message)
      },
      (error) => {
        // Handle error response
        console.error(error);
        // Provide feedback to the user (e.g., show an error message)
      }
    );
  }
}
