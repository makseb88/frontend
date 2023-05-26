import { Component, OnInit, TemplateRef } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, brandSet, cilTrash, cilPencil } from '@coreui/icons';
import { freeSet } from '@coreui/icons';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/modles/user';
import { environment } from '../../../environments/environment';
import { cilYen, cilPlus } from '@coreui/icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
  providers: [BsModalService]
})
export class OwnerComponent implements OnInit {
  searchForm!: FormGroup;
  owners: User[] = [];
  filteredOwners: User[] = [];
  modalRef!: BsModalRef;
  selectedOwner: User | null = null;
  pageSize: number = 7;
  currentPage = 1;
  totalOwners: any;
  p: number = 1;
  noResultsFound: boolean = false;


  private apiUrl = environment.serverUrl + '/admin/getOwners';
  private apiUrl2 = environment.serverUrl + '/admin';

  constructor(
    private http: HttpClient,
    private iconSet: IconSetService,
    private modalService: BsModalService,
    private paginationConfig: NgbPaginationConfig,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    paginationConfig.pageSize = 5;
    paginationConfig.boundaryLinks = true;

    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
    this.currentPage = 2;
    this.getOwners();
  }

  getOwners(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const startIndex = (this.currentPage - 1) * this.pageSize;

    this.http.get<any>(`${this.apiUrl}?startIndex=${startIndex}&pageSize=${this.pageSize}`, { headers }).subscribe(
      (response: any) => {
        this.owners = response.owners;
        this.totalOwners = response.ownerCount;
        console.log(this.totalOwners);
        this.filteredOwners = this.owners; // Initialize the filtered owners with all owners
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getOwners();
  }

  addOwner(): void {
    this.router.navigate(['/user/addOwner']);
  }

  openModal(template: TemplateRef<any>, owner: User) {
    this.selectedOwner = owner;
    this.modalRef = this.modalService.show(template);
  }
    public visible = false;


  confirmationIonenableOwner( owner: User) {
    let text = "Press a button!\nEither OK or Cancel.";
    if (confirm(text) == true) {
      text = "You pressed OK!";
      this.enableOwner(owner)
    } else {
      text = "You canceled!";
    }
   
 
  
  }
  confirmatioDisableOwner( owner: User)
  {
    let text = "Press a button!\nEither OK or Cancel.";
    if (confirm(text) == true) {
      text = "You pressed OK!";
      this.disableOwner(owner)
    } else {
      text = "You canceled!";
    }
  }

  disableOwner(owner: User): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const ownerId = owner._id;
    owner.status = 'suspended';

    this.http.put<any>(`${this.apiUrl2}/suspendOwner/${ownerId}`, {}, { headers }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }

    );
  }

  enableOwner(owner: User): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const ownerId = owner._id;
    owner.status = 'active';

    this.http.put<any>(`${this.apiUrl2}/reactivateOwner/${ownerId}`, {}, { headers }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  searchOwners(): void {
    const searchQuery = this.searchForm.get('searchQuery')?.value.toLowerCase();

    if (searchQuery) {
      this.filteredOwners = this.owners.filter(
        (owner: User) =>
          owner.firstName.toLowerCase().includes(searchQuery) ||
          owner.lastName.toLowerCase().includes(searchQuery) ||
          owner.email.toLowerCase().includes(searchQuery) ||
          owner.status.toLowerCase().includes(searchQuery)
      );
    } else {
      this.filteredOwners = this.owners;
    }
    this.noResultsFound = this.filteredOwners.length === 0;

  }
}
