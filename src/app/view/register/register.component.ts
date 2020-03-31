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
    this.aunumservices.registerInsert(this.model)
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
