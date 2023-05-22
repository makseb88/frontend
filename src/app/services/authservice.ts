import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
