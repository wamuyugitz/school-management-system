import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/core/student.service';

interface ParentDetails {
  firstName?: string;
  lastName?: string;
  relationship?: string;
  contactNumber?: string;
  email?: string;
}

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentDetailsComponent>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Data received in dialog:', data);
  }

  ngOnInit(): void {
    console.log('Initializing form with data:', this.data);

    this.studentForm = this.fb.group({
      admissionNumber: [
        { value: this.data?.admissionNumber || '', disabled: true },
      ],
      firstName: [
        { value: this.data?.firstName || '', disabled: !this.isEditMode },
        Validators.required,
      ],
      lastName: [
        { value: this.data?.lastName || '', disabled: !this.isEditMode },
        Validators.required,
      ],
      dateofbirth: [
        { value: this.data?.dateofbirth || '', disabled: !this.isEditMode },
        Validators.required,
      ],
      schoolClass: [
        {
          value: Number(this.data?.schoolClass) || null,
          disabled: !this.isEditMode,
        },
        Validators.required,
      ],
      stream: [
        {
          value: Number(this.data?.stream) || null,
          disabled: !this.isEditMode,
        },
        Validators.required,
      ],
      address: this.fb.group({
        street: [
          {
            value: this.data?.address?.street || '',
            disabled: !this.isEditMode,
          },
          Validators.required,
        ],
        city: [
          { value: this.data?.address?.city || '', disabled: !this.isEditMode },
          Validators.required,
        ],
        country: [
          {
            value: this.data?.address?.country || '',
            disabled: !this.isEditMode,
          },
          Validators.required,
        ],
        postalCode: [
          {
            value: this.data?.address?.postalCode || '',
            disabled: !this.isEditMode,
          },
          Validators.required,
        ],
      }),
      parentsDetails: this.fb.array(
        this.initParents(this.data?.parentsDetails || {}),
        Validators.required
      ),
    });

    console.log('Form initialized:', this.studentForm.value);
  }

  private initParents(parentsData: any): FormGroup[] {
    console.log('Parent data received:', parentsData);

    return Object.keys(parentsData).map((key) => {
      const parent = parentsData[key];
      console.log(`Parent from ${key}:`, parent);

      return this.fb.group({
        firstName: [
          { value: parent?.firstName || '', disabled: !this.isEditMode },
          Validators.required,
        ],
        lastName: [
          { value: parent?.lastName || '', disabled: !this.isEditMode },
          Validators.required,
        ],
        relationship: [
          { value: parent?.relationship || '', disabled: !this.isEditMode },
          Validators.required,
        ],
        contactNumber: [
          { value: parent?.contactNumber || '', disabled: !this.isEditMode },
          Validators.required,
        ],
        email: [
          { value: parent?.email || '', disabled: !this.isEditMode },
          Validators.required,
        ],
      });
    });
  }

  get parentsDetails(): FormArray {
    return this.studentForm.get('parentsDetails') as FormArray;
  }

  enableEditMode(): void {
    this.isEditMode = true;
    this.studentForm.enable();
  }

  saveChanges(): void {
    if (this.studentForm.valid) {
      const formValue = {
        ...this.studentForm.getRawValue(),
        dateOfBirth: this.studentForm.get('dateofbirth')?.value, // Use optional chaining
        schoolClass: Number(this.studentForm.get('schoolClass')?.value),
        stream: Number(this.studentForm.get('stream')?.value),
      };

      this.studentService
        .updateStudentByAdmissionNumber(this.data.admissionNumber, formValue)
        .subscribe(
          (response) => {
            console.log('Student updated successfully:', response);
            this.dialogRef.close(formValue);
          },
          (error) => {
            console.error('Error updating student:', error);
          }
        );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
