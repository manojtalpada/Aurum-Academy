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
  url_slug = sessionStorage.getItem('url_slug');
  username = JSON.parse(this.usernamedata);
  userid = sessionStorage.getItem("userid");
  url_slugdata = JSON.parse(this.url_slug);
  
  
public editModalChange;
  public editModal;
  model: any = {};
  user : any = {};
 
  
  constructor(private aunumservices: AunumService,public router: Router) {
    console.log(this.url_slugdata)
    
    this.userType =JSON.parse(sessionStorage.getItem('user_type'));

   ;
  }

  ngOnInit() {
  }

updateProfile(){

  var data ={
      // user_id : JSON.parse(this.userid),    
      // my_id: JSON.parse(this.userid),
      // action:"update_profile",
      // first_name : this.model.first_name,
      // last_name : this.model.last_name,
      // user_name:this.model.user_name,
      // email:this.model.email,
      // birthdate :this.model.birthdate,
      // url_slug:this.model.url_slug

      user_id : JSON.parse(this.userid),    
      my_id: JSON.parse(this.userid),      
      action:"update_profile",
      first_name : this.model.first_name,
      last_name : this.model.last_name,
      user_name:this.model.user_name,
      email:this.model.email,
      // this.model.password = data[0].password;
      google_id : this.model.google_id,
      facebook_id:this.model.facebook_id,
      current_package_id:"",
      current_package_name:"",
      current_package_type :"",
      current_package_pay_by_user_id :"",
      master_id:JSON.parse(sessionStorage.getItem('userid')),
      user_type : this.model.user_type,
      url_slug :this.model.url_slug,
      birthdate :this.model.birthdate,
  }
  console.log(data)

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
        // console.log(response.data)
        
        },
        err => {
          console.log(err);
        }
      )
  }

  
  editcliendataResponse(data) {
    console.log("slugurl",data);
    this.model.first_name = data[0].first_name;
    this.model.last_name = data[0].last_name;
    this.model.user_name = data[0].user_name;
    this.model.email = data[0].email;
    // this.model.password = data[0].password;
    this.model.google_id = data[0].google_id;
    this.model.facebook_id = data[0].facebook_id;
    this.model.current_package_id = data[0].current_package_id;
    this.model.current_package_name = data[0].current_package_name;
    this.model.current_package_type = data[0].current_package_type;
    this.model.current_package_pay_by_user_id = data[0].current_package_pay_by_user_id;
    this.model.master_id = data[0].master_id;
    this.model.user_type = data[0].user_type;
    this.model.url_slug = data[0].url_slug;
    // this.model.birthdate = data[0].birthdate;
    this.model.birthdate =  new Date(data[0].birthdate).toISOString().split('T')[0];;   

    this.model.created_at = data[0].created_at;
    this.model.upadteddate = data[0].updated_at; 
      
    
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
