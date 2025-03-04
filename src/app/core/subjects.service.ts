import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private apiUrl = 'http://172.16.8.12:8763/api/config/subjects';

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
