import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Store } from 'src/app/modles/store';


@Component({
  selector: 'app-allrestaurant',
  templateUrl: './allrestaurant.component.html',
  styleUrls: ['./allrestaurant.component.scss']
})

export class AllrestaurantComponent implements OnInit {
  stores: Store[] = [];

  searchForm!: FormGroup;
  restaurants: any[] = [];
  filteredRestaurants!: any[];
  pageSize = 10;
  p = 1;
  private apiUrl = environment.serverUrl + '/admin/getAllStores';


  constructor(private http: HttpClient) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.get<any>(this.apiUrl, { headers }).subscribe(
      (response: any) => {
        this.restaurants = response.stores;
        this.filteredRestaurants = [...this.restaurants];
      },
      (error) => {
        console.error(error);
        // Gérez l'erreur
      }
    );
  }

}
