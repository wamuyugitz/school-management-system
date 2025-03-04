import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StreamsComponent } from './streams/streams.component';
import { ClassesComponent } from './classes/classes.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { GradesComponent } from './grades/grades.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StudentsComponent,
    StreamsComponent,
    ClassesComponent,
    GradesComponent,
    AddStudentComponent,
    StudentDetailsComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    LayoutsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FeaturesModule {}
