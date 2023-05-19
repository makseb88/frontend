import { Component,OnInit,NgModule  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-allrestaurant',
  templateUrl: './allrestaurant.component.html',
  styleUrls: ['./allrestaurant.component.scss']
})

export class AllrestaurantComponent  {
 
  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: '/assets/restaurant.json' });
  }
  // title = 'json-read-example';
  // studentData:any;
  // url: string = '/assets/students.json';

  // constructor(private http: HttpClient) {}

  // ngOnInit() {
  //   this.http.get(this.url).subscribe(res => {
  //     this.studentData = res;
  //     console.log(this.studentData)
  //   });
  // }
  settings = {
   
    columns: {
      id: {
        title: 'ID',
      },
      Restaurant: {
        title: 'Restaurant'
      },
      Adresse: {
        title: 'Adresse'
      },
      status: {
        title: 'status'
      }
      
    },
    // action:{
    //   add :false,
    // },
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

}
