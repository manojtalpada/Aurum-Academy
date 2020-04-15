import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { Router } from '@angular/router';
import { parseDate } from 'ngx-bootstrap';
import { decode } from 'punycode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usernamee = sessionStorage.getItem('currentUser');

  usernamedata = sessionStorage.getItem('first_name');
  userType;

  username = JSON.parse(this.usernamedata);
  userid = sessionStorage.getItem("userid");

  
  
public editModalChange;
  public editModal;
  model: any = {};
  user : any = {};
 
  
  constructor(private aunumservices: AunumService,public router: Router) {
    // console.log(this.userType)
    this.userType =JSON.parse(sessionStorage.getItem('user_type'));

   
   }

  ngOnInit() {
  }

updateProfile(){

  var data ={
      user_id : JSON.parse(this.userid),    
      my_id: JSON.parse(this.userid),
      action:"update_profile",
      first_name : this.model.first_name,
      last_name : this.model.last_name,
      user_name:this.model.user_name,
      email:this.model.email,
      birthdate :this.model.birthdate,
  }

 this.aunumservices.UpdateProfiledata(data)
   .subscribe(
     response =>{
       alert("Profile Updated");

     },
     err =>{
      console.log(err);
     }
   )
 

}
  updateUserdata() {
    var datagetget = {  
      user_id : JSON.parse(this.userid),    
      my_id: JSON.parse(this.userid),
      action:"getbyid"
     }     
    this.aunumservices.updateuserdata(datagetget)
      .subscribe(
        response => {
        this.editcliendataResponse(response.data)
        console.log(response.data)
        
        },
        err => {
          console.log(err);
        }
      )
  }

  
  editcliendataResponse(data) {
    console.log(data);
    this.model.first_name = data[0].first_name;
    this.model.last_name = data[0].last_name;
    this.model.user_name = data[0].user_name;
    this.model.email = data[0].email;   
    
    this.model.birthdate =  new Date(data[0].birthdate).toISOString().split('T')[0];;   
      
    
  }

  changePassword() {
    var data ={
      user_id : JSON.parse(this.userid),    
      my_id: JSON.parse(this.userid),
      action:"change_password",
      old_password : this.user.old_password,   
      new_password:this.user.new_password,

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


}
