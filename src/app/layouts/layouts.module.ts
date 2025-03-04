import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [SidenavComponent],
})
export class LayoutsModule {}
