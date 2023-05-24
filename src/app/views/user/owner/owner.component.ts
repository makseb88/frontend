import { Component, OnInit, TemplateRef } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, brandSet,cilTrash,cilPencil} from '@coreui/icons';
import { freeSet } from '@coreui/icons';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/modles/user';
import { environment } from '../../../environments/environment';
import { cilYen, cilPlus } from '@coreui/icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';








@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
  providers: [BsModalService]

})
export class OwnerComponent implements OnInit  {

  owners: User[] = [];
  modalRef!: BsModalRef;
  selectedOwner: User | null = null;
  pageSize:number = 7;
  currentPage = 1;
  totalOwners:any;
  p:number =1;


  private apiUrl =environment.serverUrl + '/admin/getOwners';
  private apiUrl2 =environment.serverUrl + '/admin';


  constructor(private http: HttpClient, private iconSet: IconSetService, private modalService: BsModalService, private paginationConfig: NgbPaginationConfig, private router: Router) { 
    // ...
    paginationConfig.pageSize = 5;
    paginationConfig.boundaryLinks = true;
  }

  
  ngOnInit(): void {
    this.currentPage = 2; // Set the initial current page
    this.onPageChange(this.currentPage); // Call onPageChange to retrieve owners for the initial page
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
  

  disableOwner(owner: User): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const ownerId = owner._id;
    owner.status = 'suspended';
  
    this.http.put<any>(`${this.apiUrl2}/suspendOwner/${ownerId}`, {}, { headers }).subscribe(
      (response: any) => {
        // Gérer la réponse du service (par exemple, afficher un message de succès)
        console.log(response.message);
      },
      (error: any) => {
        // Gérer les erreurs (par exemple, afficher un message d'erreur)
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
        // Gérer la réponse du service (par exemple, afficher un message de succès)
        console.log(response.message);
      },
      (error: any) => {
        // Gérer les erreurs (par exemple, afficher un message d'erreur)
        console.error(error);
      }
    );
  }
  

 


  
}


