import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-logout',
  template: '<div>Logging out...</div>', // You can have a logout confirmation message or a loader here
})
export class LogoutComponent {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
    // You can perform additional logout actions here, such as redirecting to the login page or displaying a success message
    this.router.navigateByUrl('/login');
  }
}