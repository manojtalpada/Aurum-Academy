import { Component, OnInit } from '@angular/core';
import { AunumService } from 'src/app/services/aunumServices';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/components/common/treenode';

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
  lesson : any = {};
  folderID:any;
  cols: any[];
  files2: TreeNode[];
  // data:{
  //   name:""
  //   size:"",
  //   type:""
  // },
  // children:[
  //   {
  //     data:{
  //       name:"",
  //       size:"",
  //       type:""
  //     }
  //   }
    
 
  userid = sessionStorage.getItem('userid');
  constructor(private aunumservices: AunumService,private _route: ActivatedRoute) {
    this.getAllFolder();
   }
  
  ngOnInit() {
    // this.files2 = this.myfiles;

    this.cols = [
      { field: 'name', header: 'Folder Name' },
      { field: 'parent_id', header: 'Parent ID' },
      // { field: 'type', header: 'Action' }
  ];

  
  }
  myfiles: TreeNode[] 
//   myfiles: TreeNode[] = [
//     {
//       data: {
//           name: 'Cloud',
//           size: '20mb',
//           type: 'Folder',
//       },
//       children: [
//           {
//               data: {
//                   name: 'backup-1.zip',
//                   size: '10mb',
//                   type: 'Zip',
                  
//               },
//           },
//           {
//               data: {
//                   name: 'backup-2.zip',
//                   size: '10mb',
//                   type: 'Zip',
                  
//               },
//           },
//       ],
//   },
  
// ];

  openFolderModel(data){
    this.folder =data;
    console.log(data)
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
        //  this.myfiles = this.folderlist
         var str={};
         var list=[];
        
         
         this.folderlist.forEach(element => {
          var childrens=[];
          var data = element.lessions;
           if(data.length != 0){
            str={
              data:{
                 id:element.id,
                name:element.name,
                parent_id:element.parent_id,
               //  type:""
              },
            } 
            data.forEach(element1 => { 
              var cstr={
                data:{ 
                     id:element1.id,
                     name:element1.name,
                     folder_id:element1.folder_id,  
              }};
              if(data.length != 0){
                childrens.push(cstr);
              } 
         }); 
         if(data.length != 0){
          str['children'] = childrens;
        }
          }else{
             
             
              str={
               data:{
                id:element.id,
                 name:element.name,
                 parent_id:element.parent_id,
                 type:""
               },
               // children:[
               //   {
               //     data:{
               //       name:element1.name,
               //       size:element1.course_id,
               //       type:""
               //     }
               //   } 
               // ]
             }
          
  
          }
          
    list.push(str);     
         });
  
         this.files2 = list;
         console.log(this.files2)
         console.log("Deck",this.folderlist)
 },
 error => {
      console.log(error);
         }
         )}
//   getAllFolder() {
//     var dataget = {
//      my_id: JSON.parse(this.userid),
//      action:"getlist"

//    }
//    this.aunumservices.getAllFolder(dataget)
//      .subscribe(
//        response => {
//          this.folderlist = response.data;
//         //  this.myfiles = this.folderlist
//          var str;
//          var list=[]
//          var data;
//          var tmp=[];
//          this.folderlist.forEach(element => {
//           data = element.lessions;
          
//             var temp =[]
            
//                str={
//                 data:{
//                   name:element.name,
//                   size:element.parent_id,
//                   type:""
//                 },
                 
//               }
              
         
//           list.push(str);
//          }); 


//          data.forEach(element => {
           
//           tmp.push({
            
//           })
//          });





//          this.files2 = list;
    
//  },
//  error => {
//       console.log(error);
//          }
//          )}


         

         AddFolder() {
          var dataget = {
            my_id: JSON.parse(this.userid),
           action:"insert",
           name : this.folder.name,
           parent_id : this.folder.parent_id,  
          //  lessons_id:"",
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
          //  lessons_id:"",
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

        onLesson(data){

          // console.log(data)
          this.folderID = data.id;
        }
        addLesson() {
          var dataget = {
            my_id: JSON.parse(this.userid),
            course_id:"",
           action:"insert",
           name : this.lesson.name,
           description : this.lesson.description, 
           release_date:"",
           attachments_ids:"",
           cards_ids:"",
           folder_id :this.folderID

         }
        //  console.log(dataget)
          this.aunumservices.insertLesson(dataget)
            .subscribe(
              data => { 
                var custdetails = data; 
                console.log(data)
               this.getAllFolder();
               
              },
              error => {
                console.log(error);
              });
        }

        
      
}
