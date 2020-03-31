import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  public addModel;
  public editModal;
  lesson : any = {};
  lessondetails : any ={}
  id : any;
  public lessonList;
  
  userid = sessionStorage.getItem('userid');
  constructor(private aunumservices: AunumService,private _route: ActivatedRoute) {
    this.getAllLesson();
   }

  ngOnInit() {
  }
  openLessonModel(data){
    this.lesson = data
    // this.course =id
  
    // console.log(this.course.data);
    }

    AddCourse() {
      var dataget = {
        my_id: JSON.parse(this.userid),
        course_id:"",
       action:"insert",
       name : this.lesson.name,
       description : this.lesson.description, 
       release_date:"",
       attachments_ids:"",
       cards_ids:""
  
     }
      this.aunumservices.insertLesson(dataget)
        .subscribe(
          data => { 
            var custdetails = data; 
            console.log(data)
           this.getAllLesson();
           
          },
          error => {
            console.log(error);
          });
    }


    updateLesson(){
      var dataget = {
        lesson_id: JSON.parse(this.lesson.id),
       my_id: JSON.parse(this.userid),
       course_id:"",
       action:"update",
       name : this.lesson.name,
       description : this.lesson.description, 
       release_date:"",
       attachments_ids:"",
       cards_ids:""
  
      }
    
      this.aunumservices.updateLesson(dataget)
      .subscribe(
        response => {
       this.getAllLesson();
        
        },
        err => {
          console.log(err);
        }
      )
    }

    deleteLesson(item){
      var dataget = {
        lesson_id: JSON.parse(item.id),
       my_id: JSON.parse(this.userid),
       action:"delete", 
  
      }
    
      this.aunumservices.deleteLesson(dataget)
      .subscribe(
        response => {
       this.getAllLesson();
        
        },
        err => {
          console.log(err);
        }
      )
    }
    getAllLesson() {
      var dataget = {
        my_id: JSON.parse(this.userid),
       action:"getlist"
  
     }
     this.aunumservices.getAllLesson(dataget)
       .subscribe(
         response => {
           this.lessonList = response.data;
           console.log(this.lessonList)
  
   },
   error => {
        console.log(error);
           }
           )
     }
}
