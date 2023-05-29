import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Store } from 'src/app/modles/store';

@Component({
  selector: 'app-rejected-store',
  templateUrl: './rejected-store.component.html',
  styleUrls: ['./rejected-store.component.scss']
})
export class RejectedStoreComponent implements OnInit {

  pendingStores: Store[] = [];
  searchForm!: FormGroup;
  pageSize: number = 5;
  currentPage = 1;
  p: number = 1;
  private apiUrl = environment.serverUrl + '/admin/getAllStores';
  private apiUrl2 = environment.serverUrl + '/admin/';
  filteredRestaurants!: any[];

  noResultsFound: boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });
  }

  getPendingStores(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const startIndex = (this.currentPage - 1) * this.pageSize;

    this.http.get<any>(`${this.apiUrl2}rejectedStores?startIndex=${startIndex}&pageSize=${this.pageSize}`, { headers }).subscribe(
      (response: any) => {
        this.pendingStores = response.stores;
        this.filteredRestaurants = [...this.pendingStores];
        this.searchStores();

        this.fetchOwnersNames(); 
      },
      (error) => {
        console.error(error);
        // Handle the error
      }
    );
  }


  deleteStore(storeId: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete<any>(`${environment.serverUrl}/admin/deleteStores/${storeId}`, { headers }).subscribe(
      (response: any) => {
        // Suppression réussie, mettez à jour la liste des magasins
        this.getPendingStores();
      },
      (error) => {
        console.error(error);
        // Gérez l'erreur
      }
    );
  }



  searchStores(): void {
    const searchQuery = this.searchForm.get('searchQuery')?.value.toLowerCase();
  
    if (searchQuery) {
      this.filteredRestaurants = this.pendingStores.filter(
        (store: Store) =>
          store.name.toLowerCase().includes(searchQuery) ||
          store.phoneNumber.toLowerCase().includes(searchQuery) ||
          store.address.toLowerCase().includes(searchQuery)
      );
    } else {
      this.filteredRestaurants = [...this.pendingStores];
    }
    this.noResultsFound = this.filteredRestaurants.length === 0;
  }

 

  fetchOwnersNames() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.pendingStores.forEach((store: any) => {
      const storeId = store._id;
      const apiUrl = `${environment.serverUrl}/admin/getOwnerName/${storeId}`;
      this.http.get<any>(apiUrl, { headers }).subscribe(
        (response: any) => {
          store.ownerName = response.ownerName;
          console.log(store.ownerName);
          // Call searchStores() after fetching owner names
          this.searchStores();
        },
        (error) => {
          console.error(error);
          // Handle the error
        }
      );
    });
  }


  ngOnInit() {
    this.currentPage = 2;
    this.getPendingStores();  }

}
