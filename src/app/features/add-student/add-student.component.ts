import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/core/student.service';
import { StreamsService } from 'src/app/core/streams.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Stream {
  id: number;
  streamName: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;
  streams: Stream[] = [];
  relationships = ['Mother', 'Father', 'Guardian'];

  constructor(
    private fb: FormBuilder,
    private streamsService: StreamsService,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      schoolClass: ['', Validators.required],
      stream: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      parentFirstName: ['', Validators.required],
      parentLastName: ['', Validators.required],
      relationship: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    this.fetchStreams();
  }

  fetchStreams() {
    this.streamsService.getStreams().subscribe(
      (apiStreams: { id: number; streamName: string }[]) => {
        this.streams = apiStreams
          .filter((stream) => stream.id >= 1 && stream.id <= 7) // Ensure IDs 1-7 only
          .map((stream) => ({
            id: stream.id,
            streamName: `Stream ${stream.id}`, // Optional: Show as "Stream 1" instead of a name
          }));
      },
      (error: any) => {
        console.error('Error fetching streams:', error);
      }
    );
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // The alert will be visible for 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;

      // Convert date format from yyyy-mm-dd to yyyy/MM/dd
      const formattedDateOfBirth = formatDate(
        studentData.dateofbirth,
        'yyyy-MM-dd',
        'en-US'
      );

      // Transform the form data to match the API request body
      const transformedData = {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        dateOfBirth: formattedDateOfBirth,
        schoolClass: studentData.schoolClass,
        stream: studentData.stream,
        address: {
          street: studentData.street,
          city: studentData.city,
          country: studentData.country,
          postalCode: studentData.postalCode,
        },
        parentsDetails: {
          additionalProp1: {
            firstName: studentData.parentFirstName,
            lastName: studentData.parentLastName,
            relationship: studentData.relationship,
            contactNumber: studentData.contactNumber,
            email: studentData.email,
          },
        },
      };

      this.studentService.registerStudent(transformedData).subscribe(
        (response) => {
          console.log('Student registered successfully:', response);

          // Show success alert
          this.showSnackBar('Student registered successfully!', 'success');

          this.dialogRef.close('success');
        },
        (error) => {
          console.error('Error registering student:', error);

          // Show error alert
          this.showSnackBar(
            'Failed to register student. Please try again.',
            'error'
          );
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
