import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AunumService } from 'src/app/services/aunumServices';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {




  
  userid = sessionStorage.getItem("userid");
  constructor(private aunumservices: AunumService,public userService: UserService,public router: Router) { 
    // this.getAllUsers();
  
  }
  ngOnInit() {

  }

  
}
