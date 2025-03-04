import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StudentService } from 'src/app/core/student.service';
import { StreamsService } from 'src/app/core/streams.service';
import { ClassService } from 'src/app/core/class.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Class {
  id: number;
  className: string;
}

export interface Stream {
  id: number;
  streamName: string;
}

export interface Student {
  admissionNumber: number;
  name: string;
  examResult: number;
  className: string;
  streamName: string;
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit, AfterViewInit {
  classes: Class[] = [];
  streams: Stream[] = [];
  dataSource = new MatTableDataSource<Student>([]);
  selectedClass: number | null = null;
  selectedStream: number | null = null;
  totalClasses: number = 0;
  totalStreams: number = 0;
  displayedColumns: string[] = [
    'admissionNumber',
    'name',
    'className',
    'streamName',
    'examResult',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private classService: ClassService,
    private streamService: StreamsService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.fetchClasses();
    this.fetchStreams();
    this.fetchStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchClasses() {
    this.classService.getClasses().subscribe((classes: Class[]) => {
      this.classes = classes;
      this.totalClasses = this.classes.length;
    });
  }

  fetchStreams() {
    this.streamService.getStreams().subscribe((streams: Stream[]) => {
      this.streams = streams;
      this.totalStreams = streams.length;
    });
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe((students: any[]) => {
      const mappedStudents = students.map((student) => ({
        admissionNumber: student.admissionNumber,
        name: `${student.firstName} ${student.lastName}`,
        examResult: student.examResults?.length
          ? student.examResults[0].score
          : 'N/A',
        className:
          this.classes.find((c) => c.id === student.schoolClass)?.className ||
          'Unknown',
        streamName:
          this.streams.find((s) => s.id === student.stream)?.streamName ||
          'Unknown',
      }));
      this.dataSource.data = mappedStudents;
    });
  }

  filterStudents() {
    let filteredStudents = this.dataSource.data;

    if (this.selectedClass !== null) {
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.className ===
          this.classes.find((c) => c.id === this.selectedClass)?.className
      );
    }

    if (this.selectedStream !== null) {
      filteredStudents = filteredStudents.filter(
        (student) =>
          student.streamName ===
          this.streams.find((s) => s.id === this.selectedStream)?.streamName
      );
    }

    this.dataSource.data = filteredStudents;
  }
}
