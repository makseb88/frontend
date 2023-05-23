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
  pageSize = 5; // Nombre d'éléments à afficher par page
  currentPage = 1; // Page courante
  totalOwners = 0; // Total des propriétaires


  private apiUrl =environment.serverUrl + '/admin/getOwners';
  private apiUrl2 =environment.serverUrl + '/admin';


  constructor(private http: HttpClient, private iconSet: IconSetService, private modalService: BsModalService, private paginationConfig: NgbPaginationConfig, private router: Router) { 
    iconSet.icons = { cilYen, cilPlus };
    this.paginationConfig.pageSize = this.pageSize;
    this.paginationConfig.boundaryLinks = true;

  }
 
  ngOnInit(): void {
    this.getOwners();
  }



  getOwners(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Calculer l'indice de départ pour la pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
  
    this.http.get<any>(`${this.apiUrl}?startIndex=${startIndex}&pageSize=${this.pageSize}`, { headers }).subscribe(
      (response: any) => {
        this.owners = response.owners;
        this.totalOwners = response.totalOwners;
      },
      (error: any) => {
        console.error(error);
      }
    );
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


