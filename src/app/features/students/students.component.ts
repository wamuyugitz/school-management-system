import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from 'src/app/core/student.service';
import { StreamsService } from 'src/app/core/streams.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentDetailsComponent } from '../student-details/student-details.component';

interface Student {
  id: number;
  admissionNumber: number;
  name: string;
  dob: Date;
  stream: string;
  streamId: number; // Ensure this property is included
}

interface APIStudent {
  id: number;
  admissionNumber: number;
  firstName: string;
  lastName: string;
  dateofbirth: Date;
  streamId: number;
}

interface Stream {
  id: number;
  streamName: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = [
    'admissionNumber',
    'name',
    'dob',
    'stream',
    'actions',
  ];
  dataSource = new MatTableDataSource<Student>([]);
  originalStudents: Student[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedStream: string = '';
  streams: Stream[] = [];
  streamMap: { [key: number]: string } = {};
  totalStudents: number = 0;
  totalStreams: number = 0;

  constructor(
    private studentService: StudentService,
    private streamsService: StreamsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchStreams();
  }

  fetchStreams() {
    this.streamsService.getStreams().subscribe(
      (apiStreams: Stream[]) => {
        console.log('Streams fetched from API:', apiStreams);

        this.streams = apiStreams;
        this.totalStreams = this.streams.length;

        this.streamMap = {};
        this.streams.forEach((stream) => {
          this.streamMap[stream.id] = stream.streamName;
        });

        this.fetchStudents();
      },
      (error) => {
        console.error('Error fetching streams:', error);
      }
    );
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(
      (students: APIStudent[]) => {
        console.log('Raw student data from API:', students);

        if (students && students.length > 0) {
          console.log('First student object keys:', Object.keys(students[0]));
        }

        this.originalStudents = students.map((student) => {
          console.log('📢 Checking API student object:', student); // Debugging line

          return {
            id: student.admissionNumber, // Use admissionNumber as ID since there's no explicit ID
            admissionNumber: student.admissionNumber,
            name: `${student.firstName} ${student.lastName}`,
            dob: student.dateofbirth,
            stream: this.streamMap[student.streamId] || 'Unknown',
            streamId: student.streamId, // Ensure this property is included
          };
        });

        this.dataSource.data = [...this.originalStudents];
        this.totalStudents = this.originalStudents.length;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dataSource.filter = inputElement.value.trim().toLowerCase();
  }

  filterByStream() {
    if (!this.selectedStream) {
      this.fetchStudents();
    } else {
      const selectedStreamObj = this.streams.find(
        (stream) => stream.streamName === this.selectedStream
      );
      if (selectedStreamObj) {
        this.studentService.getStudentsByStream(selectedStreamObj.id).subscribe(
          (students: APIStudent[]) => {
            this.dataSource.data = students.map((student) => ({
              id: student.admissionNumber,
              admissionNumber: student.admissionNumber,
              name: `${student.firstName} ${student.lastName}`,
              dob: student.dateofbirth,
              stream: this.streamMap[student.streamId] || 'Unknown',
              streamId: student.streamId, // Ensure this property is included
            }));
          },
          (error) => {
            console.error('Error fetching students by stream:', error);
          }
        );
      }
    }
  }

  addStudent() {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '600px', // Set a width for the modal
      disableClose: true, // Prevent closing without interaction
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.fetchStudents(); // Refresh students list if a student was added
      }
    });
  }

  editStudent(student: Student) {
    // Logic to edit student
  }

  deleteStudent(student: Student) {
    // Logic to delete student
  }

  viewStudent(student: Student) {
    console.log('🛠️ Student object received:', student);

    if (!student) {
      console.error('❌ Error: Student object is null or undefined!');
      return;
    }

    console.log('Admission Number being used:', student.admissionNumber);

    if (!student.admissionNumber) {
      console.error('❌ Error: Admission Number is undefined or null!');
      return;
    }

    this.studentService
      .getStudentDetailsByAdmissionNumber(student.admissionNumber)
      .subscribe(
        (studentDetails: any) => {
          console.log('✅ Student details retrieved:', studentDetails);

          if (!studentDetails) {
            console.error(
              '❌ Error: No student details found for admission number:',
              student.admissionNumber
            );
            return;
          }

          const dialogRef = this.dialog.open(StudentDetailsComponent, {
            width: '800px',
            data: studentDetails,
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              console.log('ℹ️ Dialog closed with data:', result);
              this.fetchStudents();
            }
          });
        },
        (error) => {
          console.error('❌ Error fetching student details:', error);
        }
      );
  }
}
