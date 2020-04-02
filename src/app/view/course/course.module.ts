import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ButtonsModule, AlertModule } from 'ngx-bootstrap';
import { CourseComponent } from './course.component';
import { CourseFilterPipe } from './datafilterpipe';


@NgModule({
  imports: [
    CommonModule,
    DataTableModule, 
    ModalModule.forRoot(), 
    FormsModule,   
    ReactiveFormsModule,  
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ], 
  declarations: [CourseComponent,CourseFilterPipe]
})
export class DeckModule { }
