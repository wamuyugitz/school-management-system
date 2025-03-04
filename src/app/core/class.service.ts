import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Class {
  id: number;
  className: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private classesUrl = 'http://172.16.8.12:8763/api/config/class';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.classesUrl);
  }
}


