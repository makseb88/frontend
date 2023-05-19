import { Component } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, brandSet,cilTrash,cilPencil} from '@coreui/icons';
import { freeSet } from '@coreui/icons';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {
  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: '/assets/owner.json' });
  }
    settings = {	
    columns: {
      id: {
        title: 'ID',
        width: "20%"
      },
      firstName: {
        title: 'firstName',
        width: "20%"
      },
      lastName: {
        title: 'lastName',
        width: "20%"
      },
      email: {
        title: 'email',
        width: "20%"
      },
      status: {
        title: 'status',
        width: "20%"
      }
      
    },
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Delete',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
  };

  // data = [
  //   {
  //     id: 1,
  //     Restaurant: "Leanne Graham",
  //     Adresse: "Bret",
  //     status: "Sincere@april.biz"
  //   },
  //   {
  //     id: 2,
  //     Restaurant: "Ervin Howell",
  //     Adresse: "Antonette",
  //     status: "Shanna@melissa.tv"
  //   },
    

    
  //   {
  //     id: 11,
  //     Restaurant: "Nicholas DuBuque",
  //     Adresse: "Nicholas.Stanton",
  //     status: "Rey.Padberg@rosamond.biz"
  //   }
  // ];
  onDeleteConfirm(event:any) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event:any) {
    console.log("Create Event In Console")
    console.log(event);

  }

  onSaveConfirm(event:any) {
    console.log("Edit Event In Console")
    console.log(event);
  }

    icons = freeSet ;
  
 
// constructor(


//   public iconSet: IconSetService
// ) {
//   iconSet.icons = { cilListNumbered,cilTrash, cilPaperPlane,cilPencil, ...brandSet };
// }
}
