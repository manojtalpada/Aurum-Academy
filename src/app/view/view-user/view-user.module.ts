import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CommonModule } from '@angular/common';
// DataTable
import { DataTableModule } from 'angular2-datatable';
// import { RegistereduserFilterPipe } from './datafilterpipe';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, AlertModule, TabsModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
// import { ToasterModule } from 'angular2-toaster';

import {  ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user.component';
import { ViewUserFilterPipe } from './datafilterpipe';
// import { RegistereduserRoutingModule } from './registereduser-routing.module';
// import { RegistereduserComponent } from './registereduser.component';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  imports: [
    CommonModule,
    // RegistereduserRoutingModule,
    BsDropdownModule,
    DataTableModule,
    HttpClientModule,
    SelectModule, 
    TabsModule, 
    FormsModule,
    ReactiveFormsModule,
    // ToasterModule,
    // Ng4LoadingSpinnerModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  declarations: [ ViewUserComponent,ViewUserFilterPipe]
})
export class RegistereduserModule { }
