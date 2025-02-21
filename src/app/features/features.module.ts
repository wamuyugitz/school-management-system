import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StreamsComponent } from './streams/streams.component';
import { ClassesComponent } from './classes/classes.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StudentsComponent,
    StreamsComponent,
    ClassesComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
