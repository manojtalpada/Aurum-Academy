import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AunumService } from 'src/app/services/aunumServices';
import { appConfig } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  public imageList: any ;
  img : any = {};
  file : any = {};
  public FileList;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  uploadForm: FormGroup;  
  userid = sessionStorage.getItem('userid');
  constructor(private formBuilder: FormBuilder,private aunumservices: AunumService,private http: HttpClient,private router: Router, private route: ActivatedRoute, ) {
    this.getAllImages();
   }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  getAllImages() {
    var dataget = {
    my_id: JSON.parse(this.userid),
     action:"getlist"

   }
   this.aunumservices.getAllImage(dataget)
     .subscribe(
       response => {
         this.imageList = response.data;
        //  console.log("img",this.imageList);

 },
 error => {
      console.log(error);
         }
         )
   }




   onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.formData.append('file', file, file.name);  
      // console.log(file);
      this.uploadForm.get('profile').setValue(file);
      this.fileData = file;
      this.Addimage(file);
    }
  
    // if (event.target.files.length > 0) {
    //   // const file = event.target.files[0];
    //   // this.formData.append('file', file, file.name);
    //   this.fileData = <File>event.target.files[0]
    //   var mimeType = this.fileData.type;
    //   if (mimeType.match(/image\/*/) == null) {
    //     return;
    //   }
    //     var reader = new FileReader();      
    //   reader.readAsDataURL(this.fileData); 
    //   reader.onload = (_event) => { 
    //     this.previewUrl = reader.result; 
    //     this.formData.append('file', mimeType);
    //     this.img = this.fileData.name;
    //   }
    //   }
  }
  Addimage(file) {
    var formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
     formData.append('my_id', this.userid);
     formData.append('action', 'upload');
    //const formData = new FormData();  
    
    //formData.append('file', file);
    //formData.append('file',  this.fileData);
   // console.log("this.fileData",this.fileData);
  //   var dataget = {      
  //     my_id: JSON.parse(this.userid),
  //    action:"upload",
  //    file : formData,
  //   //  description : this.deck.description   

  //  }
   console.log("formData",formData);
    this.aunumservices.Addimage(formData)
      .subscribe(
        data => { 
          var custdetails = data; 
         this.getAllImages();
         
        },
        error => {
          console.log(error);
        });
  }



  // uploading

//   fileData: File = null;
// previewUrl:any = null;
// fileUploadProgress: string = null;
// uploadedFilePath: string = null;
// constructor(private http: HttpClient) { }
 
// fileProgress(fileInput: any) {
//       this.fileData = <File>fileInput.target.files[0];

//       if (fileInput.target.files.length > 0) {
//         const file = fileInput.target.files[0];
//         this.formData.append('file', file, file.name);  
    
//       }
//       this.preview();
// }
 
// preview() {
//     Show preview 
//     var mimeType = this.fileData.type;
//     if (mimeType.match(/image\/*/) == null) {
//       return;
//     }
 
//     var reader = new FileReader();      
//     reader.readAsDataURL(this.fileData); 
//     reader.onload = (_event) => { 
//       this.previewUrl = reader.result; 
//     }
// }
 
// onSubmit() {
//   const formData = new FormData();
//       this.formData.append('file',this.fileData);
//   var dataget = {
//     my_id: JSON.parse(this.userid),
//    action:"upload",
//    file :this.fileData,
//   //  description : this.deck.description   

//  } 
    
//       this.http.post(appConfig.apiUrl + '/uploadimg/', dataget)
//         .subscribe(res => {
//           console.log(res);
//           // this.uploadedFilePath = res.data.filePath;
//           alert('SUCCESS !!');
//         })
// }


  
}
