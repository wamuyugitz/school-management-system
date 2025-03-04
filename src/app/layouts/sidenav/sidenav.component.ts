import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isSmallScreen: boolean = false;
  isSidenavOpen: boolean = true; // Control sidenav open/close state

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    {
      icon: 'people',
      label: 'Students',
      route: '/dashboard/students',
      adminOnly: true,
    },
    {
      icon: 'school',
      label: 'Classes',
      route: '/dashboard/classes',
      adminOnly: true,
    },
    { icon: 'grade', label: 'Grades', route: '/dashboard/grades' },
  ];

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  logout() {
    // Implement logout logic here
  }
}
