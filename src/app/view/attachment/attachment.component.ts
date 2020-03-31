import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {

  public addModel;
  public editModal;
  public attachmentList;
   attachment : any = {};
  userid = sessionStorage.getItem('userid');
  public typedata: Array<IOption> = [      
    { value: 'i', label: 'Image' },
    { value: 'u', label: 'URL' },
    { value: 't', label: 'Text' }
  ]

  constructor(private aunumservices: AunumService,private _route: ActivatedRoute) {
    this.getAllAttachment();
   }

  ngOnInit() {
  }


  openAttachmeantModel(data){
    this.attachment = data;
    // console.log(this.attachment.id);
  }
  getAllAttachment() {
    var dataget = {
    my_id: JSON.parse(this.userid),
     action:"getlist"

   }
   this.aunumservices.getAllAttachment(dataget)
     .subscribe(
       response => {
         this.attachmentList = response.data;
        //  console.log("Deck",this.attachmentList)
 },
 error => {
      console.log(error);
         }
    )}




    
   AddAttachment() {
    var dataget = {
      my_id: JSON.parse(this.userid),
     action:"insert",
     parent_id : this.attachment.parent_id,
     parent_type : this.attachment.parent_type,
     type : this.attachment.type,
     media_url : this.attachment.media_url,
     content : this.attachment.content     

   }
    this.aunumservices.insertAttachment(dataget)
      .subscribe(
        data => { 
          var custdetails = data; 
         this.getAllAttachment();
         
        },
        error => {
          console.log(error);
        });
  }

  updateAttachment(){
    var dataget = {
     attachments_id: JSON.parse(this.attachment.id),
     my_id: JSON.parse(this.userid),
     action:"update",
     parent_id : this.attachment.parent_id,
     parent_type : this.attachment.parent_type,
     type : this.attachment.type,
     media_url : this.attachment.media_url,
     content : this.attachment.content 

    }
  
    this.aunumservices.UpdateAttachment(dataget)
    .subscribe(
      response => {
     this.getAllAttachment();
      
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteAttachment(){
    var dataget = {
     attachments_id:this.attachment.id,
     my_id: JSON.parse(this.userid),
     action:"delete",     

    }
    console.log(dataget);
    this.aunumservices.DeleteAttachment(dataget)
    .subscribe(
      response => {
     this.getAllAttachment();
      
      },
      err => {
        console.log(err);
      }
    )}
}


