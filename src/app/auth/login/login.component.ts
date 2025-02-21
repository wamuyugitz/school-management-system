import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Login Method
  onLogin() {
    if (!this.username || !this.password) {
      alert('Please enter username and password');
      return;
    }

    console.log('Logging in with:', this.username, this.password);

    const credentials = { username: this.username, password: this.password };

    this.authService.login(credentials).subscribe(
      (response: any) => {
        console.log('Login successful', response);

        // Store the token if login is successful
        if (response.token) {
          this.authService.saveToken(response);
          window.localStorage.setItem('token', response.token); //allows you to save token to local storage
          alert('Login Successful!');
          this.router.navigate(['/login']); // Redirect to dashboard
        } else {
          alert('Login failed: No token received');
        }
      },
      (error: any) => {
        console.error('Login failed', error);
        alert('Invalid credentials');
      }
    );
  }
}
