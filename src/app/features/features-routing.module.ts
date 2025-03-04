import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { GradesComponent } from './grades/grades.component';
import { ClassesComponent } from './classes/classes.component';
import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, // Default inside Features Module
  { path: 'students', component: StudentsComponent },
  { path: 'grades', component: GradesComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'students/add', component: AddStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
