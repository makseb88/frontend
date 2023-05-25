import { Store } from 'src/app/modles/store';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-allrestaurant',
  templateUrl: './allrestaurant.component.html',
  styleUrls: ['./allrestaurant.component.scss'],
  providers: [BsModalService]
})
export class AllrestaurantComponent implements OnInit {
  stores: Store[] = [];
  searchForm!: FormGroup;
  filteredRestaurants!: any[];
  pageSize: number = 5;
  currentPage = 1;
  totalStores: any;
  p: number = 1;
  private apiUrl = environment.serverUrl + '/admin/getAllStores';
  private apiUrl2 = environment.serverUrl + '/admin/';

  noResultsFound: boolean = false;
  selectedStatus: string = 'all';

  constructor(
    private http: HttpClient,
    private paginationConfig: NgbPaginationConfig,
    private formBuilder: FormBuilder
  ) {
    paginationConfig.pageSize = 5;
    paginationConfig.boundaryLinks = true;
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });
  }

  ngOnInit() {
    this.currentPage = 2;
    this.getStores();
  }

  getStores(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    let apiUrl = this.apiUrl; // Par défaut, utilisez l'URL pour récupérer tous les magasins

    // Vérifiez le statut sélectionné et mettez à jour l'URL de l'API en conséquence
    if (this.selectedStatus !== 'all') {
      apiUrl = `${this.apiUrl2}${this.selectedStatus}Stores`;
    }

    this.http.get<any>(`${apiUrl}?startIndex=${startIndex}&pageSize=${this.pageSize}`, { headers }).subscribe(
      (response: any) => {
        this.stores = response.stores;
        this.filteredRestaurants = this.stores;
        this.fetchOwnersNames();
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
      this.filteredRestaurants = this.stores.filter(
        (store: Store) =>
          store.name.toLowerCase().includes(searchQuery) ||
          store.phoneNumber.toLowerCase().includes(searchQuery) ||
          store.address.toLowerCase().includes(searchQuery)
      );
    } else {
      this.filteredRestaurants = this.stores;
    }
    this.noResultsFound = this.filteredRestaurants.length === 0;
  }

  fetchOwnersNames() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.filteredRestaurants.forEach((restaurant: any) => {
      const storeId = restaurant._id;
      const apiUrl = `${environment.serverUrl}/admin/getOwnerName/${storeId}`;
      this.http.get<any>(apiUrl, { headers }).subscribe(
        (response: any) => {
          restaurant.ownerName = response.ownerName;
        },
        (error) => {
          console.error(error);
          // Handle the error
        }
      );
    });
  }

  selectedStatusChange(): void {
    if (this.selectedStatus === 'pending' || this.selectedStatus === 'active' || this.selectedStatus === 'suspended' || this.selectedStatus === 'rejected' || this.selectedStatus !== 'suspended') {
      this.getStores();
    }
  }


}
