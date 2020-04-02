import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ButtonsModule, AlertModule } from 'ngx-bootstrap';
import { LessonComponent } from './lesson.component';
import { LessionFilterPipe } from './datafilterpipe';


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
  declarations: [LessonComponent,LessionFilterPipe]
})
export class DeckModule { }
