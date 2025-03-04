import { Component, OnInit } from '@angular/core';

interface User {
  name: string;
  role: 'admin' | 'student';
  gender?: 'male' | 'female';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentUser: User = {
    name: 'Lisa',
    role: 'student',
    gender: 'female',
  };

  selected: Date = new Date();

  subjectProgress: any[] = [
    { name: 'Mathematics', progress: 75 },
    { name: 'Science', progress: 60 },
    { name: 'History', progress: 85 },
  ];

  quickStats = {
    grades: { count: '24', icon: 'grade' },
    assignments: { count: '12', icon: 'assignment' },
    subjects: { count: '3', icon: 'school' },
  };

  constructor() {}

  ngOnInit() {}

  getAvatarUrl(): string {
    if (this.currentUser.role === 'admin') {
      return 'assets/avatars/admin-avatar.svg';
    }
    return `assets/avatars/${this.currentUser.gender}-avatar.svg`;
  }
}
