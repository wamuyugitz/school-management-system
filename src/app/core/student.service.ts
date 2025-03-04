import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  admissionNumber: number;
  firstName: string;
  lastName: string;
  dateofbirth: Date;
  schoolClass: number;
  stream: number;
  streamId: number;
}

export interface Stream {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  private studentsUrl = 'http://172.16.8.12:8764/api/students';
  private gradesUrl = 'http://172.16.8.12:8763/api/config/grades/score';

  constructor(private http: HttpClient) {}

  // Fetch all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  // Fetch students by stream
  getStudentsByStream(streamId: number): Observable<Student[]> {
    const url = `${this.studentsUrl}/stream/${streamId}`;
    return this.http.get<Student[]>(url);
  }

  // Register a new student
  registerStudent(studentData: any): Observable<any> {
    const url = `${this.studentsUrl}/register`;
    return this.http.post(url, studentData);
  }

  // Fetch student by ID (for general purposes)
  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.studentsUrl}/${id}`);
  }

  getGradesByScore(score: number): Observable<string> {
    return this.http.get<string>(`${this.gradesUrl}/${score}`);
  }

  // Fetch student by admission number (for student details)
  getStudentDetailsByAdmissionNumber(admissionNumber: number): Observable<any> {
    const url = `${this.studentsUrl}/admission/${admissionNumber}`;
    console.log('Fetching student details from:', url); // Log the URL for debugging
    return this.http.get<any>(url);
  }

  getStudentsByClassAndStream(
    classId: number,
    streamId: number
  ): Observable<Student[]> {
    const url = `${this.studentsUrl}?classId=${classId}&streamId=${streamId}`;
    return this.http.get<Student[]>(url);
  }

  // Update student by admission number
  updateStudentByAdmissionNumber(
    admissionNumber: number,
    student: any
  ): Observable<any> {
    const url = `${this.studentsUrl}/admissionNo/${admissionNumber}`;
    return this.http.put<any>(url, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.studentsUrl}/${id}`);
  }
}
