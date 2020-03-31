import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public addModel;
  public editModal;
  course : any = {};
  coursedetails : any ={}
  id : any;
  public courseList;
  
  userid = sessionStorage.getItem('userid');

  public type: Array<IOption> = [
      
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'hidden', label: 'Hidden' } 
  ]

  constructor(private aunumservices: AunumService,private _route: ActivatedRoute) { 
    this.getAllCourse();
  }

  ngOnInit() {
  }

  openCourseModel(data){
  this.course = data
  // this.course =id

  // console.log(this.course.data);
  }
  getAllCourse() {
    var dataget = {
      my_id: JSON.parse(this.userid),
     action:"getlist"

   }
   this.aunumservices.getAllCourse(dataget)
     .subscribe(
       response => {
         this.courseList = response.data;
         console.log(this.courseList)

 },
 error => {
      console.log(error);
         }
         )
   }

   AddCourse() {
    var dataget = {
      my_id: JSON.parse(this.userid),
     action:"insert",
     name : this.course.name,
     description : this.course.description,
     permission : this.course.permission,
     url_slug : this.course.url_slug

   }
    this.aunumservices.insertCourse(dataget)
      .subscribe(
        data => { 
          var custdetails = data; 
         this.getAllCourse();
         
        },
        error => {
          console.log(error);
        });
  }

  updateCourse(){
    var dataget = {
    courses_id: JSON.parse(this.course.id),
     my_id: JSON.parse(this.userid),
     action:"update",
     name : this.course.name,
     description : this.course.description,
     permission : this.course.permission,
     url_slug : this.course.url_slug    

    }
  
    this.aunumservices.UpdateCourse(dataget)
    .subscribe(
      response => {
     this.getAllCourse();
      
      },
      err => {
        console.log(err);
      }
    )
  }

  deletecourse(){
    var dataget = {
      courses_id: this.course.id,
     my_id: JSON.parse(this.userid),
     action:"delete",     

    }
  
    this.aunumservices.DeleteCourse(dataget)
    .subscribe(
      response => {
     this.getAllCourse();
      
      },
      err => {
        console.log(err);
      }
    )
  }

}
