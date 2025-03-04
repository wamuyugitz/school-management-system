import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from 'src/app/core/student.service';
import { SubjectsService } from 'src/app/core/subjects.service';

interface Student {
  id: number;
  admissionNumber: string;
  name: string;
  streamId: number;
  classId: number;
  grades: { [subject: string]: string };
  examResults?: { score: number; subject: { subjectName: string } }[]; // Add this line
}


interface Subject {
  id: number;
  subjectName: string;
}

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
})
export class GradesComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: MatTableDataSource<Student>;
  subjects: Subject[] = [];
  displayedColumns: string[] = ['admissionNumber', 'name'];
  streams: any;
  classes: any;

  selectedClass: number | null = null;
  selectedStream: number | null = null;
  sortColumn: string = 'admissionNumber';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private studentService: StudentService,
    private subjectsService: SubjectsService
  ) {
    this.filteredStudents = new MatTableDataSource<Student>([]);
  }

  ngOnInit() {
    this.fetchSubjects();
    this.fetchStudents();
  }

  fetchSubjects() {
    this.subjectsService.getSubjects().subscribe(
      (apiResponse: any[]) => {
        console.log('Fetched subjects:', apiResponse);
        this.subjects = apiResponse;
        this.displayedColumns = [
          'admissionNumber',
          'name',
          ...this.subjects.map((subject) => subject.subjectName),
        ];
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(
      (apiResponse: any[]) => {
        console.log('Fetched students:', apiResponse);
        this.students = apiResponse.map((student: any) => ({
          id: student.id,
          admissionNumber: student.admissionNumber,
          name: `${student.firstName} ${student.lastName}`,
          streamId: student.stream,
          classId: student.schoolClass,
          grades: {}, // Initialize grades as an empty object
        }));

        // Fetch grades for each student
        // Fetch grades for each student
        this.students.forEach((student) => {
          if (student.examResults) {
            // Check if examResults exists
            student.examResults.forEach((exam: any) => {
              this.studentService.getGradesByScore(exam.score).subscribe(
                (gradeResponse: string) => {
                  student.grades[exam.subject.subjectName] = gradeResponse;
                },
                (error) => {
                  console.error('Error fetching grades by score:', error);
                }
              );
            });
          }
        });

        this.filteredStudents = new MatTableDataSource<Student>(this.students);
        this.filteredStudents.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  filterGrades() {
    this.filteredStudents.data = this.students.filter(
      (student) =>
        (!this.selectedClass || student.classId === this.selectedClass) &&
        (!this.selectedStream || student.streamId === this.selectedStream)
    );
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredStudents.filter = filterValue;
  }

  sortGrades() {
    this.filteredStudents.data = [...this.filteredStudents.data].sort(
      (a, b) => {
        if (
          this.sortColumn === 'name' ||
          this.sortColumn === 'admissionNumber'
        ) {
          return (a as any)[this.sortColumn].localeCompare(
            (b as any)[this.sortColumn]
          );
        } else {
          return (b.grades[this.sortColumn] || '').localeCompare(
            a.grades[this.sortColumn] || ''
          );
        }
      }
    );
  }
}
