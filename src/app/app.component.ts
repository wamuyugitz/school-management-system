import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'school_management';
  showSidenav: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showSidenav =
        !this.router.url.includes('/auth/login') ||
        !this.router.url.includes('/auth'); // Hide on login page
    });
  }
}
