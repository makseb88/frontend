import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    serverUrl = environment.serverUrl;
    private apiUrl =environment.serverUrl + '/admin/updateAdminProfile';
  constructor(private http: HttpClient) {}
  updateProfile(firstName: string, lastName:string, phoneNumber: string, token:string): Observable<any> {
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const profileData = { firstName,lastName, phoneNumber };
    return this.http.put(this.apiUrl, profileData,{ headers });
  }
}