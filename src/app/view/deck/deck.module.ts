import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { ModalModule } from 'ngx-bootstrap/modal';
import { DeckFilterPipe } from './datafilterpipe';
import { DeckComponent } from './deck.component';
import { ButtonsModule, AlertModule } from 'ngx-bootstrap';


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
  declarations: [DeckComponent,DeckFilterPipe]
})
export class DeckModule { }
