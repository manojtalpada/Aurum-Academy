import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { IOption } from 'ng-select';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private aunumservices : AunumService,private _route: ActivatedRoute,
    private _router: Router) { }
    public type: Array<IOption> = [
      
      { value: '1', label: 'teacher' },
      { value: '2', label: 'student' }
  
  ];
  ngOnInit() {
  }


  register() {
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
      master_id:"",
      user_type:"",
      url_slug:"",
      action:"register"

    }
    this.aunumservices.registerInsert(data)
      .subscribe(
        data => { 
          var custdetails = data; 
          this._router.navigate(['login']);
         
        },
        error => {
          console.log(error);
        });
  }


}
