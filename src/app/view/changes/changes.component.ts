import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AunumService } from 'src/app/services/aunumServices';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {
  public toasterService: ToasterService;
  // ChangePasswordFormGroup: FormGroup;
  // newpasswordFormGroup: FormGroup;
  public usersList;
  userc:any={}
  public user : any = {};
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 10000
  });
  userid = sessionStorage.getItem("userid");
  constructor(private aunumservices: AunumService,public userService: UserService,public router: Router) { 
    // this.getAllUsers();
  
  }
  ngOnInit() {

  }
  changePassword() {
    var data ={
      user_id : JSON.parse(this.userid),    
      my_id: JSON.parse(this.userid),
      action:"forgot_password",
      old_password : this.user.first_name,
      last_name : this.user.last_name,
      new_password:this.user.user_name,

  }
     
    this.aunumservices.updatePassword(data)
      .subscribe(
        data => {
          if (data.status == "error") {         
            alert('Email not match');
          }
          else {            
             alert('New password has been sent to your Register Email Id...');
            //send email....           
            this.router.navigate(['/logout']);
          }
        },
        error => {
          console.log(error);
        });

  }

  getAllUsers() {

    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.usersList = data;
          // console.log(this.usersList)
          // var ins = [];
          // for (var i = 0; i < this.usersList.length; i++) {

          //   var str = { label: this.usersList[i].username, value: this.usersList[i]._id };

          //   ins.push(str);

          // }
          // this.userc = ins;
          // console.log(this.usersList)
        },
        error => {
          console.log(error);

        }
      )


  }
}
