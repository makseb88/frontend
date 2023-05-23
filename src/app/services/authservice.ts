import { Injectable } from '@angular/core';
import { User} from '../modles/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private userKey = 'user';
  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User {
    const userJson = localStorage.getItem(this.userKey);
    return JSON.parse(userJson!) as User;
  }
  isAuthenticated(): boolean {
    // Implement your authentication logic here
    // Check if the user is logged in or has a valid session
    // Return true if the user is authenticated, false otherwise
    const token = localStorage.getItem('token');
    return !!token; // Assuming a token is present in the session storage
  }
  logout(): void {
    // Clear session storage
    localStorage.clear();
  }
}
