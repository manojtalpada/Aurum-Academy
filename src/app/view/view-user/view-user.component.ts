import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  public userlist;
  users:any = {};
  model: any = {};
  public editModel;
  action : any = "getlist";
  public smallModal;
  country = {};
  
  userid = sessionStorage.getItem('userid');
  
  public type: Array<IOption> = [
      
    { value: 't', label: 'teacher' },
    { value: 's', label: 'student' }

];
  constructor(private aunumservices: AunumService,private _route: ActivatedRoute) {    
    this.getAllUser();

   }

  ngOnInit() {
  
  }


  
  openRegisterModel(user) {

    this.users = user;
  }

  getAllUser() {
     var dataget = {
      my_id: this.userid,
      action:"getlist"

    }
    this.aunumservices.getAllUsers(dataget)
      .subscribe(
        response => {
          this.userlist = response.data;
          console.log(response.data)
          var data = response.data;
          var list = [];
          data.forEach(element => {
            if(element.master_id == JSON.parse(sessionStorage.getItem('userid'))){
              list.push(element)
            }
          });
          console.log(list)
          this.userlist = list;
          // console.log(this.userlist)
 
  },
  error => {
       console.log(error);
          }
          )
    }

    updateUser(){
      var dataget = {

        user_id : this.users.id,
        my_id: this.userid,       
        action:"update",
        first_name : this.model.first_name,
        last_name : this.model.last_name,
        user_name:this.model.user_name,
        email:this.model.email,
        // this.model.password = data[0].password;
        google_id : "",
        facebook_id:"",
        current_package_id:"",
        current_package_name:"",
        current_package_type :"",
        current_package_pay_by_user_id :"",
        master_id:JSON.parse(sessionStorage.getItem('userid')),
        user_type : "",
        url_slug :this.model.url_slug,
        birthdate :this.model.birthdate,
        // created_at : this.model.created_at,
        // updated_at :this.model.upadteddate, 
  
      }
      // console.log(dataget.my_id);
      // console.log(dataget.user_id);
      this.aunumservices.updateuser(dataget)
      .subscribe(
        response => {
       this.getAllUser();
        
        },
        err => {
          console.log(err);
        }
      )
    }

    updateUserdata() {
      var datagetget = {
        user_id : this.users.id,      
        my_id: this.userid,
        action:"getbyid"
       }     
      
      this.aunumservices.updateuserdata(datagetget)
        .subscribe(
          response => {
          this.editcliendataResponse(response.data)
          
          },
          err => {
            console.log(err);
          }
        )
    }

    
    editcliendataResponse(data) {
      // console.log(data);
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
      this.model.birthdate = data[0].birthdate;
      this.model.created_at = data[0].created_at;
      this.model.upadteddate = data[0].updated_at;
   
      
    }

    deleteuser(){
      var datagetget = {
        user_id : this.users.id,      
        my_id: this.userid,
        action:"delete"
       } 

       console.log(datagetget)
    this.aunumservices.DeleteUser(datagetget)
    .subscribe(response =>{
      this.getAllUser();
      alert("Recode is Deleted")
    },
    err =>{
      alert("not delete")
    }
    )

    }

  
    addAccount() {
      var data={
        first_name:this.model.first_name,
        last_name:this.model.last_name,
        user_name:this.model.user_name,
        birthdate:this.model.birthdate,
        email:this.model.email,
        password:this.model.password,
        google_id:"",
        facebook_id:"",
        current_package_id:"",
        current_package_name:"",
        current_package_type:"",
        current_package_pay_by_user_id:"",
        master_id:JSON.parse(sessionStorage.getItem('userid')),
        user_type:"s",
        url_slug:"",
        action:"register"
  
      }
      console.log(data)
      this.aunumservices.registerInsert(data)
        .subscribe(
          data => { 
            var custdetails = data; 
            if(data.status == 0){

              alert('User Not Created')
            }else{

              alert('User Created Successfully')
            }
            // this._router.navigate(['login']);
           
          },
          error => {
            console.log(error);
          });
    }
}
