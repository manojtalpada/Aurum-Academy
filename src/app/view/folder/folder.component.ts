import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  public folderlist : any;
  public addModel;
  public editModal;
  folder : any = {};
  userid = sessionStorage.getItem('userid');
  constructor(private aunumservices: AunumService,private _route: ActivatedRoute) {
    this.getAllFolder();
   }

  ngOnInit() {
  }

  openFolderModel(data){
    this.folder =data;
  }
  getAllFolder() {
    var dataget = {
     my_id: JSON.parse(this.userid),
     action:"getlist"

   }
   this.aunumservices.getAllFolder(dataget)
     .subscribe(
       response => {
         this.folderlist = response.data;
         console.log("Deck",this.folderlist)
 },
 error => {
      console.log(error);
         }
         )}

         AddFolder() {
          var dataget = {
            my_id: JSON.parse(this.userid),
           action:"insert",
           name : this.folder.name,
           parent_id : this.folder.parent_id,  
           lessons_id:"",
           create_by_user_id :"" 
      
         }
          this.aunumservices.insertFolder(dataget)
            .subscribe(
              data => { 
                var custdetails = data; 
               this.getAllFolder();
               
              },
              error => {
                console.log(error);
              });
        }
      
        updateFolder(){
          var dataget = {
            folders_id: JSON.parse(this.folder.id),
           my_id: JSON.parse(this.userid),
           action:"update",
           name : this.folder.name,
           parent_id : this.folder.parent_id,  
           lessons_id:"",
           create_by_user_id :""
      
          }
        
          this.aunumservices.UpdateFolder(dataget)
          .subscribe(
            response => {
           this.getAllFolder();
            
            },
            err => {
              console.log(err);
            }
          )
        }
      
        deleteFolder(){
          var dataget = {
            folders_id: this.folder.id,
           my_id: JSON.parse(this.userid),
           action:"delete",     
      
          }
          // console.log(dataget);
          this.aunumservices.DeleteFolder(dataget)
          .subscribe(
            response => {
           this.getAllFolder();
            
            },
            err => {
              console.log(err);
            }
          )
        }
      
}
