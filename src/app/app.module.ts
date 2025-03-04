import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutsModule } from './layouts/layouts.module'; // ✅ Import LayoutsModule
import { StreamsService } from './core/streams.service';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutsModule,
  ],
  providers: [StreamsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
