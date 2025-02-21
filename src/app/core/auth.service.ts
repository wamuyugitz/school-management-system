import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://172.16.8.12:8762';
  private signupUrl = `${this.apiUrl}/auth/register`;
  private loginUrl = `${this.apiUrl}/auth/login`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //Signup Method
  signup(userData: any): Observable<any> {
    return this.http.post(this.signupUrl, userData, this.httpOptions);
  }

  //Login Method
  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials, this.httpOptions);
  }

  //Store Token After Login
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  //Retrieve Token for Authentication
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
